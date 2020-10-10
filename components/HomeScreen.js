import React from "react";
import {StatusBar,Image, ImageBackground, StyleSheet, View, Button, TouchableOpacity, Alert, Text} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import image from "../assets/background.jpg"
import logo from "../assets/logo.png"

export default function HomeScreen(props) {

    const clearAll = async () => {
        try {
          await AsyncStorage.clear()
          const data = await AsyncStorage.getItem('items')
          console.log("after clear : ", data)
          Alert.alert(`Cleared`)
        } catch(e) {
            Alert.alert(`Error`)
        }
      }
      
    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <StatusBar translucent barStyle="light-content" backgroundColor="transparent"/>
                <Image source={logo}  style={styles.logo}/>
                <TouchableOpacity style={styles.button} onPress={()=>props.navigation.navigate("My Fridge")}>
                    <Text style={styles.buttonText}>View My Fridge</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>props.navigation.navigate("Add Items")}>
                    <Text style={styles.buttonText} >Add Items</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>{clearAll()}}> 
                    <Text style={styles.buttonText}>Clear Data</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        top: -30,
        height: "5%",
        width: "45%",
        justifyContent: "space-evenly",
        alignSelf:'center',
        backgroundColor: 'rgba(190, 223, 83, .5)',
        marginTop: 15,
        borderRadius: 30,
    },
    buttonText: {
        fontSize: 17,
        color:'#1D1C1A',
        textAlign: 'center',
        textTransform: 'capitalize',
        fontFamily: 'Arial Rounded MT Bold'
    }, 
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",   
      },
    logo: { 
        top: -30,
        width: 400, 
        height: 400, 
        justifyContent: "center", 
        alignItems: "center",
        marginBottom: -20,
    }
});
