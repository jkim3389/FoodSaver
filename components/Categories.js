import React, { useState } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { fbUpdateCategory } from "../utils/storageManager";

// need to add predefined date for each category
export var defaultCategories = [
    { label: "None", value: "None", predefined: { year: 0, month: 0, day: 0 } },
    { label: "Fruit", value: "Fruit", predefined: { year: 0, month: 1, day: 0 } },
    { label: "Vegetable", value: "Vegetable", predefined: { year: 0, month: 0, day: 20 } },
    { label: "Dairy", value: "Diary", predefined: { year: 0, month: 0, day: 10 } },
    { label: "Meat", value: "Meat", predefined: { year: 0, month: 0, day: 14 } },
    { label: "Canned food", value: "Canned food", predefined: { year: 2, month: 6, day: 0 } },
    { label: "Snack", value: "Snack", predefined: { year: 1, month: 6, day: 0 } },
    { label: "new", predefined: { year: 0, month: 0, day: 0 } }
];

export default function Category(props) {
    const [year, setYear] = useState(props.category.predefined.year);
    const [month, setMonth] = useState(props.category.predefined.month);
    const [day, setDay] = useState(props.category.predefined.day);

    var curr = props.category

    if (props.category.label == "None") {
        return null;
    } else if (props.category.label == "new") {
        return (
            <TouchableOpacity onPress={() => console.log("new category")}>
                <View style={styles.rowFrontAdd}>
                    <Text style={styles.addCategory}> + Add a new category</Text>
                </View>
            </TouchableOpacity>);
    }
    return (
        <View style={styles.rowFront}>
            <View style={styles.contentContainer}>
                <Text style={styles.productname}>
                    {props.category.label}
                </Text>
            </View>

            <View style={styles.contentContainer2}>
                <RNPickerSelect
                    onValueChange={(n) => {
                        setYear(n)
                        curr.predefined.year = n
                        fbUpdateCategory(props.category.label, curr)
                    }}
                    items={years}
                    value={year}
                    style={pickerSelectStyles}
                />
                <Text style={styles.expiryDate2}>Year</Text>
            </View>

            <View style={styles.contentContainer2}>
                <RNPickerSelect
                    onValueChange={(n) => {
                        setMonth(n)
                        curr.predefined.month = n
                        fbUpdateCategory(props.category.label, curr)
                    }}
                    items={months}
                    value={month}
                    style={pickerSelectStyles}
                />
                <Text style={styles.expiryDate2}>Month</Text>
            </View>

            <View style={styles.contentContainer2}>
                <RNPickerSelect
                    onValueChange={(n) => {
                        setDay(n)
                        curr.predefined.day = n
                        fbUpdateCategory(props.category.label, curr)
                    }}
                    items={days}
                    value={day}
                    style={pickerSelectStyles}
                />
                <Text style={styles.expiryDate2}>Day</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rowFront: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: 'rgba(190, 223, 83, .5)',
        borderRadius: 5,
        height: 55,
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
    rowFrontAdd: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: 'rgba(190, 223, 83, .3)',
        borderRadius: 5,
        height: 55,
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
        color: "#1D1C1A",
        alignSelf: "center",
        fontFamily: "Arial Rounded MT Bold",
    },
    expiryDate: {
        fontFamily: "Arial Rounded MT Bold",
        fontSize: 15,
        alignSelf: "center",
        color: "#1D1C1A",
    },
    expiryDate2: {
        alignSelf: "center",
        top: -7,
    },
    contentContainer: {
        flex: 5,
    },
    contentContainer2: {
        width: 60
    },
    addCategory: {
        fontSize: 18,
        marginBottom: 5,
        color: "#5F6A6A",
        alignSelf: "center",
        fontFamily: "Arial Rounded MT Bold",
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 30,
        top: -5,
        width: 60,
        alignSelf: "center",
        margin: 10,
        marginBottom: 0,
        borderRadius: 20,
        textAlign: "center",
        fontSize: 20,
        color: "white",
        fontFamily: "Arial Rounded MT Bold",
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: "purple",
        borderRadius: 8,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

export var years = [
    { label: "0", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
];

export var months = [
    { label: "0", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
    { label: "10", value: 10 },
    { label: "11", value: 11 },
];

export var days = [
    { label: "0", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
    { label: "10", value: 10 },
    { label: "11", value: 11 },
    { label: "12", value: 12 },
    { label: "13", value: 13 },
    { label: "14", value: 14 },
    { label: "15", value: 15 },
    { label: "16", value: 16 },
    { label: "17", value: 17 },
    { label: "18", value: 18 },
    { label: "19", value: 19 },
    { label: "20", value: 20 },
    { label: "21", value: 21 },
    { label: "22", value: 22 },
    { label: "23", value: 23 },
    { label: "24", value: 24 },
    { label: "25", value: 25 },
    { label: "26", value: 26 },
    { label: "27", value: 27 },
    { label: "28", value: 28 },
    { label: "29", value: 29 },
];