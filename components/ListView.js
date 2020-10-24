import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';
import HiddenItemWithActions from './HiddenItemWithActions';
import VisibleItem from './VisibleItem';
import { readData, readDataByOne ,storeData, removeDataByOne, readAllData, fbRemoveDataByOne, fbReadAllData } from "../utils/storageManager";

export default function ListView(props) {

    const readOneData = (key) =>{
        try{
            const data = props.data;
            const result = data.find(e => {
                if (e.key === key) return e;
            });
            return result;
        } catch(e) {
            console.log(("error occured during read a singdata in ListView", e));
        }
    }

    const editRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
 
            props.navigation.navigate("Edit Items", {
                key:rowKey,
                newData: readOneData(rowKey),
                isFromViewFridge : props.isFromViewFridge,
                editItem : (!props.isFromViewFridge)? props.editItem: undefined
            });
        }
    }
    const removeItem = async (key)=>{
        try {
            removeDataByOne(key);
            fbRemoveDataByOne(key);
            const currentData = props.data;
            const newData = currentData.filter((data) => data.key != key);
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
        if(props.removeItem){
            props.removeItem(rowKey)
        } else {
            removeItem(rowKey);
        }

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
        <SwipeListView
            data={props.data}
            renderItem={renderItem}
            scrollIndicatorInsets={{ right: 1 }}
            disableRightSwipe
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-115}
        />
    )
}
