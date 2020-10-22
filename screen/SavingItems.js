import React from 'react'
import {View, Text, StyleSheet, Button, TouchableOpacity, Alert} from 'react-native'
import Background from '../components/Background'
import ListView from '../components/ListView'
import { Ionicons } from "@expo/vector-icons";

export default function SavingItems(props) {
    const removeItem = (key)=>{
        const currentData = props.data
        const newData = currentData.filter(data=>data.key != key)
        props.changeData(newData)
    }
    console.log(props.navigation)
    return (

            <View style={styles.contentContainer}>
                <ListView data={props.data} removeItem={removeItem}/>

                <TouchableOpacity style={styles.touchable} activeOpacity={0.6} onPress={() => props.navigation.navigate("Add An Item")}>
                    <View style={styles.button}>
                        <Ionicons name="md-add" size={80} color="white" />
                    </View>
                </TouchableOpacity>
            </View>

    )
}
const styles = StyleSheet.create({
    contentContainer :{
        // backgroundColor:"red",
        flex:1
    },
    touchable:{
        alignItems:"flex-end",
        marginVertical: 30,
        marginHorizontal: 30
    },
    button :{
        borderWidth:2,
        width: 100,
        height: 100,
        backgroundColor:"rgba(190, 223, 83, 1)",
        borderRadius: 100,

        alignItems:"center",
        justifyContent: "center"
    }
})