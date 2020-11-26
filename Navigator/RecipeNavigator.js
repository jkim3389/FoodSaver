import Colors from "../constants/Colors";

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
import OverviewRecipeScreen, {
  screenOptions as OverviewRecipeScreenOption,
} from "../screen/recipe/OverviewRecipeScreen";
import RecipeDetailsScreen, {
  screenOptions as RecipeDetailsScreenOption,
} from "../screen/recipe/RecipeDetailsScreen";

const defaultOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: "white",
};
const Stack = createStackNavigator();
export default function Recipenavigator() {
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      <Stack.Screen
        name="RecipeOverview"
        component={OverviewRecipeScreen}
        options={OverviewRecipeScreenOption}
      />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetailsScreen}
        options={RecipeDetailsScreenOption}
      />
    </Stack.Navigator>
  );
}

export const screenOptions = (navData) => {
  return {
    tabBarIcon: (tabInfo) => {
      return (
        <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
      );
    },
  };
};
