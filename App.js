import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "./components/HomeScreen";
import ViewItems from "./components/ViewItems";
import AddItems from "./components/AddItems";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen}/>
              <Stack.Screen name="ViewItems" component={ViewItems}/>
              <Stack.Screen name="AddItems" component={AddItems}/>
            </Stack.Navigator>
            {/* <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Fridge" component={FridgeView}/>
                <Tab.Screen name="Camera" component={TakePic}/>
            </Tab.Navigator> */}
        </NavigationContainer>
    );
}

