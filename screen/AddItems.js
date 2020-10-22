import React, { useState } from "react";
import { View, Text, Alert, Platform, StyleSheet } from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { readAllData, readData, storeData, addNewItem } from "../utils/storageManager";
import Background from "../components/Background";
import * as ImageManipulator from "expo-image-manipulator";
import "react-native-get-random-values";
// import FormData from "form-data";
import SavingItems from "./SavingItems";
import ListView from "../components/ListView";
import Loading from "./Loading";


//Currently, with pre-defined pic, it will send http request to azrue and once it successfully get the data response, it will alert dialog to display that it is done

export default function AddItems(props) {
    const [data, setData] = useState([]);
    const [isEditingMode, setIsEditingMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onPickHandler = async (mode, confidenceLimit) => {
        const grant = (await (mode === "camera"))
            ? ImagePicker.requestCameraRollPermissionsAsync()
            : ImagePicker.requestCameraPermissionsAsync();
        if (grant) {

            // setIsLoading(true)
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 0.3,
            });
            if (!result.cancelled) {
                setIsLoading(true)
                imageFetching(
                    {
                        uri: result.uri,
                        name: result.uri.replace(/^.*[\\\/]/, ""),
                        type: result.type,
                    },
                    confidenceLimit
                );
            }else {
                setIsLoading(false)
            }
        } else {
            Alert.alert("Need permission");
        }
    };

    const onSampleImage = async () => {
        var items = {
            // uri: "file:///Users/juntaekim/Desktop/newProject/FoodSaver/assets/items.jpeg",
            // uri: "file:///Users/raycho/CS4261/FoodSaver/assets/items3.png",
            // uri: "file:///Users/raycho/CS4261/FoodSaver/assets/item5.jpg",
            // uri: "file:///Users/iLuna/Repositories/FoodSaver/assets/items1.jpeg",
            // name: "items.png",
            // type: "image/png"
            // uri: "file:///Users/raycho/CS4261/FoodSaver/assets/items.jpeg",
            uri: "file:///Users/juntaekim/Desktop/newProject/FoodSaver/assets/items1.jpeg",
            name: "items.jpg",
            type: "image/jpg",
        }
        setIsLoading(true)
        await new Promise((resolve)=>setTimeout(resolve, 3000))
        
        imageFetching(items, 0)
    }
    
    
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
                `http://128.61.3.90:3000/addItems?confidence=${confidenceLimit}`,
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
                    return {
                            ...element,
                            image: cropped.uri,
                        }
                    }
                    // await storeData(element.key, {
                    //     ...element,
                    //     image: cropped.uri,
                    // });
                ),
            );
            setIsEditingMode(true),
            setIsLoading(false)
            setData(result)

            //TODO : Saving item screen open
            Alert.alert("item recognized!");
        } catch (e) {
            setIsEditingMode(false)
            setIsLoading(false)
            console.log(e);
        }

    };



    let content = ''
    if(isLoading) {
        content = <Loading/>
    } else if(isEditingMode){
        content =  <SavingItems data={data} changeData={setData} navigation={props.navigation} route={props.route}/>
    } else {
        content = (<View>
            <Text style={styles.text}>How would you like to add items?</Text>
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
                    <Text style={styles.buttonText}>Choose from library</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.navigate("Add An Item")}
                >
                    <Text style={styles.buttonText}>Manually Enter</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={onSampleImage}
                >
                    <Text style={styles.buttonText}>Sample Image</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
    }

    return <Background>{content}</Background>;
}

const styles = StyleSheet.create({
    progressBar: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        width: "90%",
        height: "40%",
        alignSelf: "center",
        justifyContent: "space-around",
    },
    button: {
        height: "35%",
        width: "70%",
        justifyContent: "space-evenly",
        alignSelf: "center",
        backgroundColor: 'rgba(190, 223, 83, .5)',
        marginVertical: 30,
        borderRadius: 30,
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 20,
        color: '#1D1C1A',
        textAlign: "center",
        textTransform: "capitalize",
    },
    text: {
        width: "90%",
        alignSelf: "center",
        fontSize: 30,
        color: '#1D1C1A',
        fontFamily: 'Arial Rounded MT Bold',
        textAlign: 'center',
        marginBottom: 60
    },
});

//  TODO handle oversized picture
