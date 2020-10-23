import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    Alert,
} from "react-native";
import Background from "../components/Background";
import ListView from "../components/ListView";
import { Ionicons } from "@expo/vector-icons";
import { storeData, addNewItem } from "../utils/storageManager";

export default function SavingItems(props) {
    const removeItem = (key) => {
        const currentData = props.data;
        const newData = currentData.filter((data) => data.key != key);
        props.changeData(newData);
    };
    const addItem = (item) => {
        const currentData = props.data;
        props.changeData([...currentData, item]);
    };

    const savingItem = (data)=>{
        data.map((item)=>{
            addNewItem(item.key, item)            
        })
        props.navigation.navigate("Home");
        Alert.alert("Items are saved in the Fridge")
    }
    return (
        <View style={styles.contentContainer}>
            <ListView data={props.data} removeItem={removeItem} />

            <View style={styles.touchableContainer}>
                <TouchableOpacity
                    style={styles.touchable}
                    activeOpacity={0.6}
                    onPress={() =>
                        props.navigation.navigate("Add An Item", {
                            fromSavingItemScreen: true,
                            onSelectData: addItem,
                        })
                    }
                >
                    <View style={styles.button}>
                        <Ionicons name="md-add" size={60} color="white" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.touchable}
                    activeOpacity={0.6}
                    onPress={()=>savingItem(props.data)}
                >
                    <View style={styles.button}>
                        <Ionicons name="md-save" size={60} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    touchableContainer :{
        flexDirection:'row'
    },
    contentContainer: {
        // backgroundColor:"red",
        flex: 1,
    },
    touchable: {
        alignItems: "center",
        justifyContent: "space-evenly",
        marginVertical: 30,
        marginHorizontal: 30,
    },
    button: {
        borderWidth: 2,
        width: 150,
        height: 75,
        backgroundColor: "rgba(190, 223, 83, 1)",
        borderRadius: 25,

        alignItems: "center",
        justifyContent: "center",
    },
});
