import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
export default function EmptyFridge() {
    return (
        <View style={styles.emptyContainer}>
            <Image
                source={require("../assets/noItems.png")}
                style={styles.noItems}
            />
            <Text style={styles.emptyHeader}>No Item</Text>
            <Text style={styles.emptyBody}>please add items</Text>
        </View>
    );
}

const styles = StyleSheet.create({
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
        alignItems: "center",
    },
    noItems: {
        top: -30,
        width: 200,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: -20,
    },
});
