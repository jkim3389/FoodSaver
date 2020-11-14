import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigator from "./HomeNavigator";
import TabNavigator from "./TabNavigator";
import MainNavigator from "./MainNavigator";

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
