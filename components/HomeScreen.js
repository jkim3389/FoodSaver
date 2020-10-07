import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

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
            <View
                style={{
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <TouchableOpacity style={styles.button}>
                    <Button title="View My Fridge" onPress={()=>props.navigation.navigate("FridgeView")} />
                    <Button title="Take a pic" onPress={()=>props.navigation.navigate("TakePic")}/>
                    <Button title="Clear Data" onPress={()=>{clearAll()}}/>
                    <Button title="Camera" onPress={()=>props.navigation.navigate("Camera")}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "green"
    },
    button: {
        height: "20%",

        borderColor: "white",
        borderWidth: 2,
        justifyContent: "space-evenly",
    },
    text: {
        marginTop: 30,
        backgroundColor: "red",
        alignItems: "center",
        color: "white",
    },
});
