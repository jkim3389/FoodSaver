<<<<<<< HEAD
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
            navigation.navigate("Edit Items", {
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
console.log(props.data)
    return (
        <View style={styles.flatListView}>
            <TouchableOpacity
                style={styles.addItembtn}
                onPress={() => navigation.navigate("Add Items")}
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
                // renderHiddenItem={renderHiddenItem}
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
=======
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import image from "../assets/background.jpg"
import { SwipeListView } from 'react-native-swipe-list-view';
import noItems from "../assets/noItems.png"
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import IconEvilIcons from 'react-native-vector-icons/EvilIcons'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'

const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
}

const editRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    if (rowMap[rowKey]) {
        navigation.navigate("Edit Items", {
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
    closeRow(rowMap, rowKey);
    removeItem(rowKey);
}

const HiddenItemWithActions = props => {
    const {onEdit, onDelete} = props;

    return (
        <View style={styles.rowBack}>
            <TouchableOpacity style={styles.backRightBtnLeft} onPress = {onEdit} > 
                <IconEvilIcons name="pencil" size={35}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backRightBtnRight} onPress = {onDelete}>
                <IconEvilIcons name="trash" size={35}/>
            </TouchableOpacity>
        </View>
    )
}

const renderHiddenItem = (data, rowMap) => {
    return (
        <HiddenItemWithActions
        data = {data}
        rowMap={rowMap}
        onEdit={() => editRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
        />
        )
    }
    
const VisibleItem = props => {
    const {data} = props;
    return (
        <TouchableHighlight>
            <View style={styles.rowFront}>
                <Image source={data.item.image}/>
                <Text style={styles.productname}>{data.item.productname}</Text>
                <Text style={styles.expirydate}>Expiry Date: <BoldText>{data.item.expiryDate}</BoldText> days left</Text>
            </View>
        </TouchableHighlight>
    )
}

const renderItem = (data, rowMap) => {
    return (
        <VisibleItem data={data}/>
    );
};

return (
    <View style={styles.flatListView}>
        <TouchableOpacity style={styles.addItembtn} onPress={() => navigation.navigate("Add Items")}>
            <IconMaterialIcons name="add" style={styles.addItembtnText}/>
            <Text style={styles.addItembtnText}>Click to add items</Text>
        </TouchableOpacity>

        <SwipeListView
            data={data}
            renderItem={renderItem}
            scrollIndicatorInsets={{right : 1}}
            disableRightSwipe
            renderHiddenItem={renderHiddenItem}
            rightOpenValue = {-115}
        >
        </SwipeListView>
    </View>
)
>>>>>>> 991f2ca2dc757567d6abd54e5b0e0441ad54c393
