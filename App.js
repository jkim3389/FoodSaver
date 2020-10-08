import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screen/HomeScreen";
import ViewItems from "./screen/ViewItems";
import AddItems from "./screen/AddItems";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="My Fridge" component={ViewItems} />
                <Stack.Screen name="Add Items" component={AddItems} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
