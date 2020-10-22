import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screen/HomeScreen";
import ViewItems from "./screen/ViewItems";
import AddItems from "./screen/AddItems";
import EditItems from "./screen/EditItems";
import AddItemsManually from "./screen/AddItemsManually";
import SavingItems from "./screen/SavingItems";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
export default function App() {
    return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="My Fridge" component={ViewItems} />
                    <Stack.Screen name="Add Items" component={AddItems} />
                    <Stack.Screen name="Add An Item" component={AddItemsManually} />
                    <Stack.Screen name="Edit Items" component={EditItems} />
                    <Stack.Screen name="Saving Items" component={SavingItems}/>
                </Stack.Navigator>
            </NavigationContainer>
    );
}
