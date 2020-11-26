import HomeScreen, {
  screenOptions as HomescreenOption,
} from "../screen/HomeScreen";
import ViewItems, {
  screenOptions as ViewItemScreenOptions,
} from "../screen/ViewItems";
import AddItems, {
  screenOptions as AddItemScreenOptions,
} from "../screen/AddItems";
import EditItems, {
  screenOptions as EditItemsScreenOptions,
} from "../screen/EditItems";
import AddItemsManually, {
  screenOptions as AddItemsManuallyScreenOptions,
} from "../screen/AddItemsManually";
import SavingItems from "../screen/SavingItems";
import LoginScreen, {
  screenOptions as LoginScreenOption,
} from "../screen/LoginScreen";
import Setting from "../screen/Setting";
import Colors from "../constants/Colors";

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
const defaultOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: "white",
};
const Stack = createStackNavigator();
export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      {/* <Stack.Screen
                name="LogIn"
                component={LoginScreen}
                options={LoginScreenOption}
            /> */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={HomescreenOption}
      />
      <Stack.Screen
        name="MyFridge"
        component={ViewItems}
        options={ViewItemScreenOptions}
      />
      <Stack.Screen
        name="Add Items"
        component={AddItems}
        options={AddItemScreenOptions}
      />
      <Stack.Screen
        name="Add An Item"
        component={AddItemsManually}
        options={AddItemsManuallyScreenOptions}
      />
      <Stack.Screen
        name="Edit Items"
        component={EditItems}
        options={EditItemsScreenOptions}
      />
      <Stack.Screen name="Saving Items" component={SavingItems} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
}

export const screenOptions = (navData) => {
  return {
    tabBarIcon: (tabInfo) => {
      return <Ionicons name="ios-basket" size={25} color={tabInfo.tintColor} />;
    },
  };
};
