import React from 'react'
import {
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    View,
    Image,
    Text,
} from "react-native";
import IconEvilIcons from 'react-native-vector-icons/EvilIcons'
import { SwipeListView } from 'react-native-swipe-list-view'

export default function ExpiredItem(props) {

    const renderItem = ({item}, rowMap) => {
        return (
            <TouchableHighlight>
                <View style={styles.rowFront}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.contentContainer}>
                        <Text style={styles.productname}>{item.productname}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };

    const removeItem = async (key)=>{
        try {
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

    const renderHiddenItem = ({ item }, rowMap) => {
        return (
            <View style={styles.rowBack}>
                <TouchableOpacity style={styles.backRightBtnRight} onPress = {()=>deleteRow(rowMap, item.key)}>
                    <IconEvilIcons name="trash" size={40}/>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SwipeListView
            data={props.data}
            renderItem={renderItem}
            scrollIndicatorInsets={{ right: 1 }}
            disableRightSwipe
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-65}
        />
    )
}


const styles = StyleSheet.create({
    rowFront: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "rgb(52, 52, 52)",
        borderRadius: 5,
        height: 100,
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
        color: "#f2e6d7",
        fontFamily: "Arial Rounded MT Bold",
    },
    expiryDate: {
        fontSize: 15,
        color: "#f2e6d7",
    },
    image: {
        width: 90,
        height: 90,
        flex: 2,
    },
    contentContainer: {
        // backgroundColor:"blue",
        flex: 5,
        paddingLeft: 15,
    },

    rowBack :{
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingLeft: 15,
        margin: 5,
        marginBottom: 5,
        borderRadius: 5,
    },
    backRightBtnRight :  {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        top: 0,
        width: 50,
        backgroundColor: 'red',
        right: 5,
        borderRadius: 5,
        height: 80,
    }
});