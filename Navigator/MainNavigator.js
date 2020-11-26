import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen, {
  screenOptions as LoginScreenOption,
} from "../screen/LoginScreen";
import TabNavigator, {
  screenOptions as TabBarScreenOption,
} from "./TabNavigator";
import Colors from "../constants/Colors";

const Stack = createStackNavigator();
const defaultOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: "white",
};
export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      <Stack.Screen
        name="LogIn"
        component={LoginScreen}
        options={LoginScreenOption}
      />
      <Stack.Screen
        name="TabBar"
        component={TabNavigator}
        options={TabBarScreenOption}
      />
    </Stack.Navigator>
  );
}
