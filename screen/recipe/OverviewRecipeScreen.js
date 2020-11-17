import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fbReadAllData, getUID } from "../../utils/storageManager";
import { db, auth } from "../../utils/config";
import axios from "axios";
import Recipe from "../../model/recipe";
import Colors from "../../constants/Colors";
import RecipeItem from "../../components/recipe/RecipeItem";
export default function OverviewRecipeScreen(props) {
  const [data, setData] = useState([]);
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    db.ref(`/${getUID()}/items`).on("value", (dataSnapshot) => {
      let data = dataSnapshot.val() ? dataSnapshot.val() : {};
      let items = Object.values(data);
      let itemName = [];
      for (let key in items) {
        itemName.push(items[key].productname);
      }
      setData(itemName);
    });
  }, [fbReadAllData()]);
  useEffect(() => {
    const fetchData = async () => {
      var options = {
        method: "GET",
        url:
          "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients",
        params: {
          ingredients: data.join(),
          number: "10",
          ranking: "1",
          ignorePantry: "true",
        },
        headers: {
          "x-rapidapi-key":
            "93c9db0026msha03c45cc676c4b5p10a378jsn2bf81d97da8c",
          "x-rapidapi-host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        },
      };

      await axios
        .request(options)
        .then(function (response) {
          const recipes = response.data.map((recipe) => {
            return {
              id: recipe.id,
              title: recipe.title,
              image: recipe.image,
              usedIngredients: recipe.usedIngredients.map(
                (ingredient) => ingredient.name
              ),
            };
          });
          const updatedRecipe = recipes.map((recipe) => {
            const updatedIngredients = recipe.usedIngredients.filter(
              (ingredient) =>
                data.some(
                  (keyword) =>
                    ingredient.toLowerCase().includes(keyword.toLowerCase()) ===
                    true
                )
            );

            return {
              ...recipe,
              usedIngredients: updatedIngredients,
            };
          });

          setRecipes(
            updatedRecipe.map((recipe) => {
              return new Recipe(
                recipe.id,
                recipe.title,
                recipe.image,
                recipe.usedIngredients
              );
            })
          );
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    fetchData();
  }, [data]);
  const onRenderItem = ({ item }) => {
    return (
      <RecipeItem
        imageUrl={item.imageUrl}
        title={item.title}
        usedIngredients={item.usedIngredients}
        id={item.id}
        navigation={props.navigation}
      />
    );
  };
  return (
    <View style={styles.screen}>
      <View style={styles.title}>
        <Text style={styles.text}>LIST OF RECIPES</Text>
      </View>
      <FlatList data={recipes} renderItem={onRenderItem} />
    </View>
  );
}

export const screenOptions = (navData) => {
  return {
    title: "Home",
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  screen: {
    marginBottom: 120,
    backgroundColor: Colors.primary,
  },
  title: {
    marginTop: 100,
    marginBottom: 30,
  },
  text: {
    fontSize: 26,
    textAlign: "center",
    fontFamily: "Arial Rounded MT Bold",
  },
});
