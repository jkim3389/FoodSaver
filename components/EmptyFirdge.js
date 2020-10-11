import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EmptyFridge() {
    return (
        <View style={styles.emptyContainer}>
            <Image source={noItems}  style={styles.noItems}/>
            <Text style={styles.emptyHeader}>No items..</Text>
            <Text> </Text>
            <Text style={styles.emptyBody}>Please add items.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    emptyHeader: {
        fontSize: 30,
        color: "#5F6A6A",
    },
    emptyBody: {
        fontSize: 20,
        color: "#5F6A6A",
        marginTop: 20,
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