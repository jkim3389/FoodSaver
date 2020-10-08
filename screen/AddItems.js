import React from "react";
import { ImageBackground, ImageEditor, View, Text, Alert, Button, Platform, StyleSheet } from "react-native";
import axios from "axios";
// import AsyncStorage from '@react-native-community/async-storage';
import * as ImagePicker from 'expo-image-picker';
// import image from "../assets/background.jpg"
import { TouchableOpacity } from "react-native-gesture-handler";
import {readData, storeData} from '../utils/storageManager'
import Background from "../components/Background";


//Currently, with pre-defined pic, it will send http request to azrue and once it successfully get the data response, it will alert dialog to display that it is done

var keyIndex = 0;

export default class AddItems extends React.Component {
     
    componentDidMount() {
        const endpoint = `https://foodsaver.cognitiveservices.azure.com/`;
        const key = `8962510d94cc4c40aeec29ad416fce1a`;
        const apiPath = `${endpoint}/vision/v2.0/analyze`;
    


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
            uri: "file:///Users/juntaekim/Documents/newProject/FoodSaver/assets/items.jpeg",
            
            name: "items.jpeg",
            // uri: "file:///Users/benpooser/Documents/GitHub/FoodSaver/assets/items2.png",
            // name: "items2.png",
            type: "image/jpeg"
        }
        fd.append("file", items)
        axios.post(
            apiPath,
            fd,
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

            const res = objects.map(object=>{
                
                if (object.object === "Fruit") {
                    
                    // console.debug(object.rectangle.x)
                    // return {key : (Math.random()), productname: object.object, expiryDate: 8, image: cropImage(object)}
                    return {key : keyIndex++, productname: object.object, expiryDate: 8, image: cropImage(object)}
                }
                // return {key : (Math.random()), productname: object.object, expiryDate: 10,image: cropImage(object)
                return {key : keyIndex++, productname: object.object, expiryDate: 10,image: cropImage(object)
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
            // console.log(result); 
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
        return (
            <Background>

                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={this.pickCamera}>
                        <Text style={styles.buttonText} >Take a picture</Text>  
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.pickImage}>
                        <Text style={styles.buttonText}>Choose from library</Text>
                    </TouchableOpacity>
                </View>

            </Background>
        );
    }
}

const styles = StyleSheet.create({
    container: { 
        width: '90%',
        height: '30%',
        alignSelf: 'center', 
        justifyContent: 'space-around' 
    },
    // image: {
    //     flex: 1,
    //     resizeMode: "cover",
    //     justifyContent: "center"
    // },
    button: {
        height: "50%",
        width: "80%",
        justifyContent: "space-evenly",
        alignSelf:'center',
        backgroundColor: '#D8ECCF',
        marginTop: 30,
        marginBottom: 30,
        borderRadius: 20,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 20,
        color:'#1D1C1A',
        textAlign: 'center',
        textTransform: 'capitalize'
    }, 
});