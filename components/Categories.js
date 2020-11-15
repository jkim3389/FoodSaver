import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// need to add predefined date for each category
export var categories = [
    { label: "None", value: "None", predefined: "5" },
    { label: "Fruit", value: "Fruit", predefined: "" },
    { label: "Vegetable", value: "Vegetable", predefined: "" },
    { label: "Dairy", value: "Diary", predefined: "" },
    { label: "Meat", value: "Meat", predefined: "" },
    { label: "Canned food", value: "Canned food", predefined: "" },
    { label: "Snack", value: "Snack", predefined: "" },
];

function setPredifned(label, predefined) {
    categories.filter(category => category.label == label)[0][predefined] = predefined;
}

export default function Category(props) {
    return (
        <TouchableOpacity
        // onPress={}
        >
            <View style={styles.rowFront}>
                <View style={styles.contentContainer}>
                    <Text style={styles.productname}> 
                        {props.category.label}
                    </Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.expiryDate}>
                        10         5         3
                        {props.category.predefined}
                    </Text>
                    <Text style={styles.expiryDate2}>
                        Year   Month   Day
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    rowFront: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: 'rgba(190, 223, 83, .5)',
        borderRadius: 5,
        height: 50,
        margin: 5,
        marginBottom: 5,
        shadowColor: "#999",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    productname: {
        fontSize: 20,
        marginBottom: 5,
        color: "black",
        alignSelf: "center",
        fontFamily: "Arial Rounded MT Bold",
    },
    expiryDate: {
        fontFamily: "Arial Rounded MT Bold",
        fontSize: 15,
        alignSelf: "center",
        color: "black",
    },
    expiryDate2: {
        fontSize: 15,
        alignSelf: "center",
        color: "black",
    },
    contentContainer: {
        flex: 5,
    },
});
