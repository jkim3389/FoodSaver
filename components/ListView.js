import React from 'react'
import { SwipeListView } from 'react-native-swipe-list-view';
import HiddenItemWithActions from './HiddenItemWithActions';
import VisibleItem from './VisibleItem';

export default function ListView(props) {
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
            removeDataByOne(key);
            const newData = await readAllData();
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
