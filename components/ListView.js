import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';
import HiddenItemWithActions from './HiddenItemWithActions';
import VisibleItem from './VisibleItem';
import { readData, readDataByOne ,storeData, removeDataByOne, readAllData, fbRemoveDataByOne, fbReadAllData } from "../utils/storageManager";

export default function ListView(props) {
    // console.log(props.data);
    // console.log(" ");

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
            console.log(rowKey);
            props.navigation.navigate("Edit Items", {
                key:rowKey,
                newData: readOneData(rowKey),
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
