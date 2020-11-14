import Background from "../components/Background";
import Category, { categories, setPredefined } from "../components/Categories"
import { SwipeListView } from 'react-native-swipe-list-view';
import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TextInput,
    Image,
    Alert,
} from "react-native";

export default function Settings() {

    return <Background>
        <View style style={styles.container}>
            <Text style={styles.title}>Category                    Fresh for</Text>
            <SwipeListView
                data={categories}
                renderItem={renderCategory}
                scrollIndicatorInsets={{ right: 1 }}
                disableRightSwipe
                rightOpenValue={-115}
            /></View>
    </Background>;
}

const renderCategory = ({ category }, rowMap) => {
    return <Category category={category} />;
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