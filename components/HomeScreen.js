import React from "react";
import { ImageBackground, StyleSheet, Text, View, Button, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import image from "../assets/background.jpg"

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
                <TouchableOpacity style={styles.button}>
                    <Button title="View My Fridge" onPress={()=>props.navigation.navigate("ViewItems")} />
                    <Button title="Add Items" onPress={()=>props.navigation.navigate("AddItems")}/>
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
        height: "20%",

        borderColor: "white",
        borderWidth: 2,
        justifyContent: "space-evenly",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
    text: {
        marginTop: 30,
        backgroundColor: "red",
        alignItems: "center",
        color: "white",
    },
});
