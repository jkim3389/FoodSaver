import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import HiddenItemWithActions from "./HiddenItemWithActions";
import VisibleItem from "./VisibleItem";

export default function ItemListView(props) {

    const editRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
        if (rowMap[rowKey]) {
            props.navigation.navigate("Edit Items", {
                keyNumber:rowKey,
            });
        }
    }
    const removeItem = async (key)=>{
        try {
            const newData = [...data];
            const prevIndex = data.findIndex(item => item.key === key);
            newData.splice(prevIndex,1);
            setData(newData);
            await AsyncStorage.setItem("items",JSON.stringify(newData));
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

    const renderItem = ({ item }) => {
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
                style={{ ...styles.flatList, ...props.style }}
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
    listContainer: {
        alignItems: "center",
        backgroundColor: "red",
    },

    flatList: {
        // backgroundColor: "green",
        width: "100%",
    },
    list: {
        width: "100%",
        backgroundColor: "rgba(52, 52, 52, 0.2)",
        marginTop: 10,
        padding: 30,
        alignItems: "center",
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
