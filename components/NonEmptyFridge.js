import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import HiddenItemWithActions from "./HiddenItemWithActions";
import VisibleItem from "./VisibleItem";
import { readData, storeData } from "../utils/storageManager";
import AsyncStorage from "@react-native-community/async-storage";
import ListView from "./ListView";


export default function NonEmptyFridge(props) {
    return (
        <View style={styles.flatListView}>
            <TouchableOpacity
                style={styles.addItembtn}
                onPress={() => props.navigation.navigate("Add Items")}
            >
                <IconMaterialIcons name="add" style={styles.addItembtnText} />
                <Text style={styles.addItembtnText}>Click to add items</Text>
            </TouchableOpacity>

            <ListView data={props.data}/>
        </View>
    );
}

const styles = StyleSheet.create({
    flatListView: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(236, 227, 207, 0.7)",
    },
    addItembtn: {
        backgroundColor: "#FBFCFC",
        borderRadius: 5,
        height: 60,
        margin: 5,
        flexDirection: "row",
    },
    addItembtnText: {
        alignItems: "center",
        fontSize: 25,
        paddingLeft: 10,
        color: "#797D7F",
        alignSelf: "center",
    },
});
