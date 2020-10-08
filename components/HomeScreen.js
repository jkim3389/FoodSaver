import React from "react";
import {StatusBar,Image, ImageBackground, StyleSheet, View, Button, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import image from "../assets/background.jpg"
import logo from "../assets/logo.png"
import { greaterThan } from "react-native-reanimated";

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
                <TouchableOpacity style={styles.button}>
                    <Button title="View My Fridge" onPress={()=>props.navigation.navigate("My Fridge")} />
                    <Button title="Add Items" onPress={()=>props.navigation.navigate("Add Items")}/>
                    <Button title="Clear Data" onPress={()=>{clearAll()}}/>
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
        marginTop: -20,
        height: "20%",
        // borderColor: "white",
        // borderWidth: 2,
        justifyContent: "space-evenly",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
      },
    logo: { 
        top: -10,
        width: 400, 
        height: 400, 
        justifyContent: "center", 
        alignItems: "center",
    }
});
