import Background from "../components/Background";
import Category, { defaultCategories } from "../components/Categories";
// import { SwipeListView } from 'react-native-swipe-list-view';
import { getUID } from "../utils/storageManager";
import { db } from "../utils/config";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
// import { FlatList } from "react-native-gesture-handler";

export default function Settings() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    var ref = db.ref(`/${getUID()}/categories`);
    ref.on("value", (snapshot) => {
      if (!snapshot.exists()) {
        var c = [];
        defaultCategories.forEach((key, value) => {
          if (key.label != "new") {
            db.ref(`/${getUID()}/categories`).child(key.label).set(key);
            c.push(key);
          }
        });
      } else {
        let data = snapshot.val() ? snapshot.val() : {};
        var c = [];
        Object.values(data).forEach((key, value) => {
          c.push(key);
        });
      }
      setCategories(c);
    });
  }, []);

  return (
    <Background>
      <View style style={styles.container}>
        <Text style={styles.title}>Category Fresh for</Text>

        {categories ? (
          //Can be changed to swipeListView if heejoo want to add edit/delete functionality by swiping
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : null}
      </View>
    </Background>
  );
}
const renderCategory = (category, rowMap) => {
  return <Category category={category.item} />;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(236, 227, 207, 0.7)",
    alignSelf: "center",
  },
  title: {
    // marginTop: -10,
    fontSize: 20,
    color: "#5F6A6A",
    alignSelf: "center",
    fontFamily: "Arial Rounded MT Bold",
  },
});
