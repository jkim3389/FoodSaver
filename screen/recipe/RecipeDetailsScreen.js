import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
export default function RecipeDetailsScreen(props) {
  console.log(props.navigation);
  return (
    <View>
      <Text>aa</Text>
    </View>
  );
}

export const screenOptions = (navData) => {
  return {
    headerTitle: "View Recipes..",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Back"
          iconName="md-arrow-round-back"
          onPress={() => {
            navData.navigation.goBack();
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({});
