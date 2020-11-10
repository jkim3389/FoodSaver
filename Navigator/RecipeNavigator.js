import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator, {
    screenOptions as HomeScreenOption,
} from "./HomeNavigator";
import OverviewRecipeScreen, {
    screenOptions as OverviewRecipeScreenOption,
} from "../screen/recipe/OverviewRecipeScreen";

const BottomTab = createBottomTabNavigator();

export default function RecipeNavigator() {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen
                name="Fridge"
                component={HomeNavigator}
                options={HomeScreenOption}
            />
            <BottomTab.Screen
                name="Recipe"
                component={OverviewRecipeScreen}
                options={OverviewRecipeScreenOption}
            />
        </BottomTab.Navigator>
    );
}
export const screenOptions = (navData) => {
    return {
        headerShown: false,
    };
};
