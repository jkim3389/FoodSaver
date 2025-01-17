import React, { useState } from "react";
import { View, Text, Alert, Platform, StyleSheet } from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import Background from "../components/Background";
import * as ImageManipulator from "expo-image-manipulator";
import "react-native-get-random-values";
import SavingItems from "./SavingItems";
import Loading from "./Loading";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { getFormatedDate } from "react-native-modern-datepicker";

export default function AddItems(props) {
    const [data, setData] = useState([]);
    const [isEditingMode, setIsEditingMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onPickHandler = async (mode, confidenceLimit) => {
        const grant = await (mode === "camera"
            ? ImagePicker.requestCameraRollPermissionsAsync()
            : ImagePicker.requestCameraPermissionsAsync());
        // console.log(grant);
        if (grant) {
            // setIsLoading(true)
            const ImagePickerConfig = {
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 0.3,
            };

            let result = await (mode === "camera"
                ? ImagePicker.launchCameraAsync(ImagePickerConfig)
                : ImagePicker.launchImageLibraryAsync(ImagePickerConfig));

            if (!result.cancelled) {
                setIsLoading(true);
                imageFetching(
                    {
                        uri: result.uri,
                        name: result.uri.replace(/^.*[\\\/]/, ""),
                        type: result.type,
                    },
                    confidenceLimit
                );
            } else {
                setIsLoading(false);
            }
        } else {
            Alert.alert("Need permission");
        }
    };

    const onSampleImage = async () => {
        var items = {
            uri:
                // "file:///Users/juntaekim/Desktop/newProject/FoodSaver/assets/items.jpeg",
                "file:///Users/raycho/CS4261/FoodSaver/assets/items1.jpeg",
                // "file:///Users/iLuna/Repositories/FoodSaver/assets/items1.jpeg",
                // "file:///Users/benpooser/Documents/GitHub/FoodSaver/assets/items1.jpeg",
            name: "items.jpg",
            type: "image/jpg",
        };
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));

        imageFetching(items, 0);
    };

    const imageFetching = async (image, confidenceLimit = 0) => {
        const fd = new FormData();
        var items = {
            uri:
                Platform.OS === "android"
                    ? image.uri
                    : image.uri.replace("file://", ""),
            name: image.name,
            type: "image/jpeg",
        };

        fd.append("upload", items);

        try {
            const { data: response } = await axios.post(
                `https://gentle-river-84632.herokuapp.com/addItems?confidence=${confidenceLimit}`,
                fd,
                {}
            );
            const result = await Promise.all(
                response.map(async (element) => {
                    const cropped = await ImageManipulator.manipulateAsync(
                        image.uri,
                        [{ crop: element.image }],
                        { compress: 1 }
                    );
                    const randomValue = Math.floor(Math.random() * 10)
                    var expirationDay = new Date()
                    expirationDay.setDate((new Date(getToday())).getDate()+randomValue+1)
                    return {
                        ...element,
                        image: cropped.uri,
                        expiryDate: randomValue,
                        expirationDay: getFormatedDate(expirationDay, "YYYY/MM/DD"), 
                    };
                })
            );
            setIsEditingMode(true), setIsLoading(false);
            setData(result);

            Alert.alert("item recognized!");
        } catch (e) {
            setIsEditingMode(false);
            setIsLoading(false);
            console.log(e);
        }
    };

    let content = "";
    if (isLoading) {
        content = <Loading />;
    } else if (isEditingMode) {
        content = (
            <SavingItems
                fetchingData={data}
                changeData={setData}
                navigation={props.navigation}
                route={props.route}
            />
        );
    } else {
        content = (
            <View>
                <Text style={styles.text}>
                    How would you like to add items?
                </Text>
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onPickHandler("camera", 0)}
                    >
                        <Text style={styles.buttonText}>Take a picture</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onPickHandler("image", 0)}
                    >
                        <Text style={styles.buttonText}>
                            Choose from library
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => props.navigation.navigate("Add An Item")}
                    >
                        <Text style={styles.buttonText}>Manually Enter</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                        style={styles.button}
                        onPress={onSampleImage}
                    >
                        <Text style={styles.buttonText}>Sample Image</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        );
    }

    return <Background>{content}</Background>;
}

const getToday = () => {
    var date = new Date().getDate(); //To get the Current Date
    var month = new Date().getMonth() + 1; //To get the Current Month
    var year = new Date().getFullYear(); //To get the Current Year
    return year + "-" + month + "-" + date;
};

export const screenOptions = (navData) => {
    return {
        headerTitle: "Adding Items",
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Back"
                    iconName="md-arrow-round-back"
                    onPress={() => {
                        navData.navigation.goBack();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Back"
                    iconName="ios-basket"
                    onPress={() => {
                        navData.navigation.navigate("MyFridge");
                    }}
                />
            </HeaderButtons>
        ),
    };
};
const styles = StyleSheet.create({
    progressBar: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        width: "90%",
        height: "60%",
        alignSelf: "center",
        justifyContent: "space-around",
    },
    button: {
        top: 50,
        height: "35%",
        width: "70%",
        justifyContent: "space-evenly",
        alignSelf: "center",
        backgroundColor: "rgba(190, 223, 83, .5)",
        marginVertical: 30,
        borderRadius: 30,
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#1D1C1A",
        textAlign: "center",
        textTransform: "capitalize",
    },
    text: {
        top: 30,
        width: "90%",
        alignSelf: "center",
        fontSize: 30,
        color: "#1D1C1A",
        fontFamily: "Arial Rounded MT Bold",
        textAlign: "center",
        marginBottom: 60,
    },
});
