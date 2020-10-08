import React from "react";
import { ImageBackground, View, Text, Alert, Button, Platform, StyleSheet } from "react-native";
import { ImageEditor, View, Text, Alert, Button, Platform } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
import * as ImagePicker from 'expo-image-picker';
import image from "../assets/background.jpg"

// import { v4 as uuidv4 } from 'uuid';

//Currently, with pre-defined pic, it will send http request to azrue and once it successfully get the data response, it will alert dialog to display that it is done


export default class AddItems extends React.Component {
    
    componentDidMount() {
        const endpoint = `https://foodsaver.cognitiveservices.azure.com/`;
        const key = `8962510d94cc4c40aeec29ad416fce1a`;
        const apiPath = `${endpoint}/vision/v2.0/analyze`;
    
        const storeData = async (value)=>{
            try {
                await AsyncStorage.setItem("items", JSON.stringify(value))
            } catch(e){
                console.log("error occured during store data", e)
            }
        }
        const readData = async () => {
            try {
                const data = await AsyncStorage.getItem("items")
                if(data != null){
                    // console.log(JSON.parse(data))
                    return JSON.parse(data)
                } else {
                    return []
                }
            }catch(e){
                console.log("error occured during reading data", e)
            }
        }

        const cropImage = async (object) => {
            cropData = {
                offset:{x:object.rectangle.x,y:object.rectangle.y}, 
                size:{width:object.rectangle.w, height:object.rectangle.h},
            }
            try{
                await ImageEditor.cropImage(items.uri, 
                    cropData, (successURI) => {object.image = successURI}, 
                    (error) =>{console.log('cropImage,',error)}
                )
            }
            catch(error){
                console.log('Error caught in this.cropImage:', error)
            }
        }
        const fd = new FormData();
        var items = {
            uri: "file:///Users/raycho/CS4261/FoodSaver/assets/items.jpeg",
            
            name: "items.jpeg",
            // uri: "file:///Users/benpooser/Documents/GitHub/FoodSaver/assets/items2.png",
            // name: "items2.png",
            type: "image/jpeg"
        }
        fd.append("file", items)
        axios.post(
            apiPath,
            fd,
            // {
            //     data: "/Users/benpooser/Documents/GitHub/FoodSaver/assets/items.jpg"
            //     // url:
            //     //     "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
            // },
            {
                params: {
                    language : "en",
                    visualFeatures: "Objects"
                },
                headers : {
                    "Ocp-Apim-Subscription-Key" : key,
                    "Content-Type": "multipart/form-data"
                }
            }
        ).then(({data:{objects}})=>{
            // let items = {}
            console.log(objects);
            const res = objects.map(object=>{
                if (object.object === "Fruit") {

                    // console.debug(object.rectangle.x)
                    return {key : (Math.random()), productname: object.object, expiredData: 8, image: cropImage(object)}
                }
                return {key : (Math.random()), productname: object.object, expiredData: 10,image: cropImage(object)
                }
            })


            // items = objects.forEach(element => {
            //     const id = Math.floor(Math.random() * 100)
            //     return {
            //     ...items,
            //     id : {
            //         productName: element.object,
            //         expirationData: 10,
            //     },
            // }});

            // storeData([{test:"a"}])
            // readData().then(data=>console.log( data))
            readData().then((data)=>{
                const listOfObject = [...data, ...res]
                storeData(listOfObject)
                Alert.alert(`Items are added to data!`)
            })
            })
        .catch((e)=>console.log("error", e));
    }

    // function to bring image from cameraroll
    pickImage = async () => {
        const grant = await ImagePicker.requestCameraRollPermissionsAsync();
        if (grant) {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: false,
            //   aspect: [3, 4],
              quality: 1,
            });
            // print the information of image
            console.log(result);
        } else {
            Alert.alert("Need permission for libaray");
        }
    };
    
    //function to take a picture using default camera
    pickCamera = async () => {  
        const grant = await ImagePicker.requestCameraPermissionsAsync();
        if(grant) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                // aspect: [3, 4],
                quality: 1,
            });
            // print the information of image
            console.log(result);
        } else {
            Alert.alert("Need permission for camera");
        }
    };

    render() {
        // return (
        //     <View>
        //         <Text>Camera UI will be added here. Currenly online url is used to detect objects</Text>
        //     </View>
        // );
        return (
            <ImageBackground source={image} style={styles.image}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Take a picture" onPress={this.pickCamera} />
                <Button title="Pick an image from camera roll" onPress={this.pickImage} />
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
});
