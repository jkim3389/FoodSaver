import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator, {
  screenOptions as HomeScreenOption,
} from "./HomeNavigator";
import Recipenavigator, {
  screenOptions as RecipeNavigatorOption,
} from "./RecipeNavigator";

const BottomTab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Fridge"
        component={HomeNavigator}
        options={HomeScreenOption}
      />
      <BottomTab.Screen
        name="Recipe"
        component={Recipenavigator}
        options={RecipeNavigatorOption}
      />
    </BottomTab.Navigator>
  );
}
export const screenOptions = (navData) => {
  return {
    headerShown: false,
  };
};
