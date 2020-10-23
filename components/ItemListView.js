import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import HiddenItemWithActions from "./HiddenItemWithActions";
import VisibleItem from "./VisibleItem";
import { readData, storeData, removeDataByOne, readAllData, fbRemoveDataByOne, fbReadAllData } from "../utils/storageManager";


export default function ItemListView(props) {
    const editRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
            props.navigation.navigate("Edit Items", {
                key:rowKey,
            });
        }
    }
    const removeItem = async (key)=>{
        try {
            removeDataByOne(key);
            fbRemoveDataByOne(key);
            const newData = await readAllData();
            // const newData = fbReadAllData();
            props.updateData(newData);
        } catch(e){
            console.log("error occured during remove item", e)
        }
    }
    const deleteRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
        removeItem(rowKey);
    }

    const renderItem = ({ item }, rowMap) => {
        return <VisibleItem data={item} />;
    };
    const renderHiddenItem = ({ item }, rowMap) => {
        return (
            <HiddenItemWithActions
                data={item}
                rowMap={rowMap}
                onEdit={()=>editRow(rowMap, item.key)}
                onDelete={()=>deleteRow(rowMap, item.key)}
            />
        );
    };

    return (
        <View style={styles.flatListView}>
            <TouchableOpacity
                style={styles.addItembtn}
                onPress={() => props.navigation.navigate("Add Items")}
            >
                <IconMaterialIcons name="add" style={styles.addItembtnText} />
                <Text style={styles.addItembtnText}>Click to add items</Text>
            </TouchableOpacity>

            <SwipeListView
                data={props.data}
                renderItem={renderItem}
                scrollIndicatorInsets={{ right: 1 }}
                disableRightSwipe
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-115}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    flatListView: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(236, 227, 207, 0.7)",
    },
    addItembtn: {
        backgroundColor: "#FBFCFC",
        borderRadius: 5,
        height: 60,
        margin: 5,
        flexDirection: "row",
    },
    addItembtnText: {
        alignItems: "center",
        fontSize: 25,
        paddingLeft: 10,
        color: "#797D7F",
        alignSelf: "center",
    },
});
