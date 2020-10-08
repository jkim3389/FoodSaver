import React from "react";
import { View, Text, StyleSheet } from "react-native";
export default function EmptyFridge() {
    return (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyHeader}>No Item</Text>
            <Text style={styles.emptyBody}>please add items</Text>
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
});
