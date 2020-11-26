import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import axios from "axios";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { fbReadAllData, getUID } from "../../utils/storageManager";
import { db, auth } from "../../utils/config";

export default function RecipeDetailsScreen(props) {
  const [recipe, setRecipe] = useState({});
  const [userIngredients, setUserIngredients] = useState(props.userIngredients);
  const [requiredIngredients, setRequiredIngredients] = useState([]);
  const recipeId = props.route.params.id;

  useEffect(() => {
    db.ref(`/${getUID()}/items`).on("value", (dataSnapshot) => {
      let data = dataSnapshot.val() ? dataSnapshot.val() : {};
      let items = Object.values(data);
      let itemName = [];
      for (let key in items) {
        itemName.push(items[key].productname);
      }
      setUserIngredients(itemName);
    });
  }, [fbReadAllData()]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`,
      headers: {
        "x-rapidapi-key": "93c9db0026msha03c45cc676c4b5p10a378jsn2bf81d97da8c",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const recipeInfo = {
          healthy: response.data.healthScore,
          title: response.data.title,
          time: response.data.readyInMinutes,
          image: response.data.image,
          imageSource: response.data.sourceUrl,
          instructions: response.data.analyzedInstructions,
        };
        setRecipe(recipeInfo);

        // console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/ingredientWidget.json`,
      headers: {
        "x-rapidapi-key": "93c9db0026msha03c45cc676c4b5p10a378jsn2bf81d97da8c",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const formattedIngredients = response.data.ingredients.map(
          (ingredient) => {
            return {
              name: ingredient.name,
            };
          }
        );
        setRequiredIngredients(formattedIngredients);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const renderIngredient = () => {
    const result = requiredIngredients.map((ingredient) => {
      const isUserHas = userIngredients.some(
        (userIngredient) =>
          ingredient.name
            .toLowerCase()
            .includes(userIngredient.toLowerCase()) === true
      );
      return {
        ...ingredient,
        isUserHas,
      };
    });
    // setRequiredIngredients(result);

    return result.map((ingredient, index) => {
      return (
        <Text style={styles.check} key={index}>
          {ingredient.isUserHas ? (
            <Ionicons name="ios-checkmark-circle" size={16} color="green" />
          ) : (
            <Ionicons name="ios-close-circle" size={16} color="red" />
          )}
          {"   "}
          {ingredient.name}
        </Text>
      );
    });
  };

  const renderRecipeInstruction = () => {
    if (Object.keys(recipe).length > 0) {
      const formattedInstructions = recipe.instructions.map(
        (itemInstruction) => {
          return {
            name: itemInstruction.name === "" ? "" : itemInstruction.name,
            steps: itemInstruction.steps.map((step) => {
              return { number: step.number, detail: step.step };
            }),
          };
        }
      );
      return formattedInstructions.map((item, index) => {
        return (
          <View key={index} style={styles.eachItem}>
            <Text style={styles.itemHeader}>{item.name}</Text>
            {/* <View style={styles.instructionsStepContainer}> */}
            {item.steps.map((step, index) => {
              return (
                <View key={index} style={styles.instructionsStepContainer}>
                  <Text style={styles.instructionHeader}>
                    STEP {step.number}
                  </Text>
                  <Text style={styles.instructionDetails}>{step.detail}</Text>
                </View>
              );
            })}
          </View>
        );
      });
    } else {
    }
  };
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.screen}>
        <ImageBackground
          source={{ uri: recipe.image }}
          style={styles.imageContainer}
          resizeMode="cover"
        >
          <LinearGradient
            // Background Linear Gradient
            // start={{ x: 0.5, y: 0.5 }}
            colors={["black", "rgba(0, 0, 0, 0.5)"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            locations={[0, 0.5]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: "100%",
            }}
          />
          <View style={styles.title}>
            <Text style={styles.titleText} numberOfLines={2}>
              {recipe.title}
            </Text>
          </View>
          <View style={styles.imageInformation}>
            <View style={styles.rowWithoutBorder}>
              <Text style={styles.rowText}>
                {requiredIngredients.length}{" "}
                <Text style={styles.greyText}>Ingredients</Text>
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowText}>
                {recipe.healthy}{" "}
                <Text style={styles.greyText}>healthy Score</Text>
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowText}>
                {recipe.time} <Text style={styles.greyText}>MINS</Text>
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.contentContainer}>
          <View style={styles.ingredients}>
            <Text style={styles.ingredientText}>Ingredients</Text>
            <View style={styles.ingredientsContent}>{renderIngredient()}</View>
          </View>
          <View style={styles.instruction}>
            <Text style={styles.ingredientText}>
              Guided Recipe instructions
            </Text>
            <View style={styles.instructionsContainer}>
              {renderRecipeInstruction()}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  imageContainer: {
    flex: 4,
    width: "100%",
    height: "100%",
    backgroundColor: "yellow",
  },
  contentContainer: {
    flex: 6,
    width: "100%",
    // height: "100%",
  },
  title: {
    margin: 30,
    marginTop: "25%",
    // height: "30%",
    width: "75%",
    // backgroundColor: "red",
  },
  titleText: {
    fontSize: 22,
    fontFamily: "Arial Rounded MT Bold",
    color: "white",
  },
  imageInformation: {
    // marginHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
    marginBottom: 50,
    // backgroundColor: "blue",
  },
  rowWithoutBorder: {
    flex: 1,
    alignItems: "center",
  },
  row: {
    borderLeftWidth: 2,
    borderLeftColor: "white",
    flex: 1,
    alignItems: "center",
    // backgroundColor: "yellow",
  },
  rowText: {
    fontSize: 16,
    color: "white",
    fontFamily: "Arial Rounded MT Bold",
  },
  greyText: {
    color: "#ccc",
    fontSize: 14,
  },
  ingredientText: {
    fontSize: 22,
    fontFamily: "Arial Rounded MT Bold",
  },
  ingredients: {
    margin: 20,
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    padding: 10,
  },
  ingredientsContent: {
    margin: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  check: {
    width: "100%",
    fontSize: 16,
    lineHeight: 16,
    marginVertical: 5,
  },
  instructionsContainer: {
    margin: 10,
  },
  instructionsStepContainer: {
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  instructionHeader: {
    fontFamily: "Arial Rounded MT Bold",
  },
  instructionDetails: {
    marginTop: 10,
  },
  instructionItem: {},
  instruction: {
    margin: 20,
  },
  itemHeader: {
    fontSize: 18,
    color: "red",
    fontFamily: "Arial Rounded MT Bold",
  },
});

export const screenOptions = (navData) => {
  return {
    headerTransparent: true,
    // headerTitle: navData.route.params.title,
    headerTitle: "",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Back"
          iconName="md-arrow-round-back"
          onPress={() => {
            navData.navigation.goBack();
          }}
          color="white"
        />
      </HeaderButtons>
    ),
  };
};
