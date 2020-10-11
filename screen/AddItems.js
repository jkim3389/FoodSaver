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
import * as ImageManipulator from "expo-image-manipulator";

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

    const cropImage = async (srcPath, {rectangle}) => {
        const cropData = {
            originX:rectangle.x,
            originY:rectangle.y,
            width:rectangle.w,
            height:rectangle.h
        }
        try{
            const cropped = await ImageManipulator.manipulateAsync(srcPath, [{crop:cropData}], {compress: 1})
            return cropped.uri
        }
        catch(error){
            console.log('Error caught in this.cropImage:', error)
        }
    }

    const imageFetching = async (image) => {
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
        const { data: { objects: response } } = await axios.post(apiPath, fd, {
                params: {
                    language: "en",
                    visualFeatures: "Objects",
                },
                headers: {
                    "Ocp-Apim-Subscription-Key": key,
                    "Content-Type": "multipart/form-data",
                },
            })

        const dataToBeSaved = await Promise.all(response.map(async (object)=>{
            const cropURI = await cropImage(items.uri, object)
            return {
                key: keyIndex++,
                productname: object.object,
                // TODO: set ExpiryDate based on user-defined setting
                expiryDate: Math.floor(Math.random() * 10),
                image: cropURI,
            }
        }))

        const existingDataFromStorage = await readData()
        const listOfObject = [...existingDataFromStorage, ...dataToBeSaved]
        await storeData(listOfObject)
        Alert.alert(`Items are added to data!`);
    };
    // function to bring image from cameraroll
    const pickImage = async () => {
        const grant = await ImagePicker.requestCameraRollPermissionsAsync();
        if (grant) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 1,
            });

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
                quality: 1,
            });
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
