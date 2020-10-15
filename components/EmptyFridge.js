import React, {useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function EmptyFridge(props) {
    
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.addItembtn}
                onPress={() => props.navigation.navigate("Add Items")}
            >
                <IconMaterialIcons name="add" style={styles.addItembtnText} />
                <Text style={styles.addItembtnText}>Click to add items</Text>
            </TouchableOpacity>
            <View style={styles.emptyContainer}>
                <Image source={require("../assets/noItems.png")}  style={styles.noItems}/>
                <Text style={styles.emptyHeader}>No Item</Text>
                <Text/>
                <Text style={styles.emptyBody}>please add items</Text>
            </View>    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height:'100%',
    },
    emptyHeader: {
        fontSize: 30,
        color: "#5F6A6A",
        fontFamily: "Arial Rounded MT Bold",
    },
    emptyBody: {
        marginTop: -10,
        fontSize: 20,
        color: "#5F6A6A",
        fontFamily: "Arial Rounded MT Bold",
    },
    emptyContainer: {
        alignItems: 'center',
        
    },
    noItems: {
        top: -30,
        width: 200,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: -20,
    },
    addItembtn: {
        backgroundColor: "#FBFCFC",
        borderRadius: 5,
        height: 60,
        margin: 5,
        flexDirection: "row",
        marginBottom:'40%',
    },
    addItembtnText: {
        alignItems: "center",
        fontSize: 25,
        paddingLeft: 10,
        color: "#797D7F",
        alignSelf: "center",
    },
});
