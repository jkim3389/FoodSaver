import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import RecipeCard from "./RecipeCard";

export default function RecipeItem(props) {
  return (
    <RecipeCard style={styles.card}>
      <View style={styles.touchable}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("RecipeDetails", { id: props.id });
            Alert.alert("clicked!");
          }}
        >
          {/* <View> */}
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: props.imageUrl }}
              resizeMode="stretch"
            />
          </View>
          {/* </View> */}
          <View style={styles.details}>
            <Text style={styles.title} numberOfLines={1}>
              {props.title}
            </Text>
            <Text style={styles.body} numberOfLines={1}>
              Used Item : {props.usedIngredients.join()}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </RecipeCard>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 300,
    margin: 20,

    // flex: 1,

    // justifyContent: "space-around",
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    alignItems: "center",
    justifyContent: "center",
    height: "30%",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "Arial Rounded MT Bold",
  },
  body: {
    fontSize: 16,
    color: "#ccc",
  },
});
