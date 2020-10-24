import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
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

            <ListView data={props.data} navigation={props.navigation} updateData={props.updateData} isFromViewFridge = {true}/>
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
