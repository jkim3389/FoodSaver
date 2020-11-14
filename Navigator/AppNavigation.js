import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigator from "./HomeNavigator";

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <HomeNavigator />
        </NavigationContainer>
    );
}
