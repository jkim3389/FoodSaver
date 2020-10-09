import React, { useState } from "react";
import {
    ImageBackground,
    ImageEditor,
    Image,
    View,
    Text,
    Alert,
    Button,
    Platform,
    StyleSheet,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { readData, storeData } from "../utils/storageManager";
import Background from "../components/Background";

//Currently, with pre-defined pic, it will send http request to azrue and once it successfully get the data response, it will alert dialog to display that it is done

var keyIndex = 0;

export default function AddItems(props) {

    const onPickImageHandler = () => {
        pickImage().then((data) => {
            imageFetching(data);
        });
    };

    const onPickCameraHandler = () => {
        pickCamera().then((data) => {
            imageFetching(data);
        });
    };

    const imageFetching = (image) => {
        const endpoint = `https://foodsaver.cognitiveservices.azure.com`;
        const key = `8962510d94cc4c40aeec29ad416fce1a`;
        const apiPath = `${endpoint}/vision/v2.0/analyze`;

        const fd = new FormData();
        var items = {
            uri: image.uri,
            name: image.name,
            type: "image/jpeg",
        };
        fd.append("file", items);
        axios
            .post(apiPath, fd, {
                params: {
                    language: "en",
                    visualFeatures: "Objects",
                },
                headers: {
                    "Ocp-Apim-Subscription-Key": key,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(({ data: { objects } }) => {
                const res = objects.map((object) => {
                    if (object.object === "Fruit") {
                        // console.debug(object.rectangle.x)
                        return {
                            key: keyIndex++,
                            productname: object.object,
                            expiryDate: 8,
                            // image: cropImage(object),
                        };
                    }
                    return {
                        key: keyIndex++,
                        productname: object.object,
                        expiryDate: 10,
                        // image: cropImage(object),
                    };
                });

                readData().then((data) => {
                    const listOfObject = [...data, ...res];
                    storeData(listOfObject);
                    Alert.alert(`Items are added to data!`);
                });
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    };
    // function to bring image from cameraroll
    const pickImage = async () => {
        const grant = await ImagePicker.requestCameraRollPermissionsAsync();
        if (grant) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                //   aspect: [3, 4],
                quality: 1,
            });
            // print the information of image
            // console.log(result);
            return {
                uri: result.uri,
                name: result.uri.replace(/^.*[\\\/]/, ""),
                type: result.type,
            };
        } else {
            Alert.alert("Need permission for libaray");
        }
    };

    //function to take a picture using default camera
    const pickCamera = async () => {
        const grant = await ImagePicker.requestCameraPermissionsAsync();
        if (grant) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                // aspect: [3, 4],
                quality: 1,
            });
            // print the information of image
            // this.setState({ image: result.uri });
            return {
                uri: result.uri,
                name: result.uri.replace(/^.*[\\\/]/, ""),
                type: result.type,
            };
        } else {
            Alert.alert("Need permission for camera");
        }
    };

    return (
        <Background>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onPickCameraHandler}
                >
                    <Text style={styles.buttonText}>Take a picture</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onPickImageHandler}
                >
                    <Text style={styles.buttonText}>Choose from library</Text>
                </TouchableOpacity>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: "30%",
        alignSelf: "center",
        justifyContent: "space-around",
    },
    button: {
        height: "50%",
        width: "80%",
        justifyContent: "space-evenly",
        alignSelf: "center",
        backgroundColor: "#D8ECCF",
        marginTop: 30,
        marginBottom: 30,
        borderRadius: 20,
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#1D1C1A",
        textAlign: "center",
        textTransform: "capitalize",
    },
});

//  TODO handle oversized picture
