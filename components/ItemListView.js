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