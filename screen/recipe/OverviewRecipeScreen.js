import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
export default function OverviewRecipeScreen() {
    return (
        <View>
            <Text>
                gjhgjhggjhggggjhgjhggjhggggjhgjhggjhggggjhgjhggjhggggjhgjhggjhggggjhgjhggjhggggjhgjhggjhggg
            </Text>
        </View>
    );
}

export const screenOptions = (navData) => {
    return {
        tabBarIcon: (tabInfo) => {
            return (
                <Ionicons
                    name="ios-restaurant"
                    size={25}
                    color={tabInfo.tintColor}
                />
            );
        },
    };
};

const styles = StyleSheet.create({});
