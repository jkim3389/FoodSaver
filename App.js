import React from "react";
import "react-native-gesture-handler";
// import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LogBox } from "react-native";
import Colors from "./constants/Colors";
import AppNavigation from "./Navigator/AppNavigation";

LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
]);

export default function App() {
    return <AppNavigation />;
}
