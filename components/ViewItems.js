import React, { useEffect, useState } from "react";
import { Image, ImageBackground, View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import image from "../assets/background.jpg"
import { SwipeListView } from 'react-native-swipe-list-view';
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import IconEvilIcons from 'react-native-vector-icons/EvilIcons'


export default function ViewItems(props) {

    const [data, setData] = useState([]);
    const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
    useEffect(() => {
        async function readData() {
            try {
                const data = await AsyncStorage.getItem("items");
                if (data != null) {
                    console.log(JSON.parse(data))
                    setData(JSON.parse(data));
                } else {
                    return setData([]);
                }
            } catch (e) {
                console.log("error occured during reading data", e);
            }
        }
        readData();
    }, []);

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
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
                <TouchableOpacity style={styles.backRightBtnLeft} onPress = {onEdit}> 
                <IconEvilIcons name="pencil" size="35"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backRightBtnRight} onPress = {onDelete}>
                    <IconEvilIcons name="trash" size="35"/>
                </TouchableOpacity>
            </View>
        )
    }

    
    const renderHiddenItem = (data, rowMap) => {
        return (
            <HiddenItemWithActions
            data = {data}
            rowMap={rowMap}
            onEdit={() => closeRow(rowMap, data.item.key)}
            onDelete={() => deleteRow(rowMap, data.item.key)}
            />
            )
        }
        
        const VisibleItem = props => {
            const {data} = props;
            return (
                <TouchableHighlight>
                    <View style={styles.rowFront}>
                        <Text style={styles.productname}>{data.item.productname}</Text>
                        <Text style={styles.expirydate}>Expiry Date: <B>{data.item.expiryDate}</B> days left</Text>
                    </View>
                </TouchableHighlight>
            )
        }
    
        const renderItem = (data, rowMap) => {
            return (
                <VisibleItem data={data}/>
            );
        };

    if (data.length == 0 ) {
        return (
            <ImageBackground source={image} style={styles.image}>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyHeader}>No Item</Text>
                    <Text> </Text>
                    <Text style={styles.emptyBody}>please add items</Text>
                </View>
            </ImageBackground>
        )
    } else {
        return (
            <ImageBackground source={image} style={styles.image}>
                <View>
                    <SwipeListView
                        data={data}
                        style={styles.flatList}
                        renderItem={renderItem}
                        scrollIndicatorInsets={{right : 1}}
                        disableRightSwipe
                        renderHiddenItem={renderHiddenItem}
                        rightOpenValue = {-115}
                    >
                    </SwipeListView>
                </View>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    flatList: {
        width: "100%",
        height: "95%",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
    rowFront: {
        // backgroundColor:'rgba(52, 52, 52, 0.1)',
        flex:1,
        backgroundColor:'rgb(52, 52, 52)',
        borderRadius: 5,
        height: 60,
        margin: 5,
        marginBottom: 5,
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        paddingHorizontal: 10,
      },
    productname: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: "#f2e6d7"
    },
    expirydate: {
        fontSize: 15,
        color: "#f2e6d7"
    },
    emptyHeader: {
        fontSize: 30,
        color: '#5F6A6A',
    },
    emptyBody: {
        fontSize: 20,
        color: '#5F6A6A',
    },
    emptyContainer: {
        alignItems: "center",
    },
    rowBack: {
        alignItems: 'center',
        // backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingLeft: 15,
        margin: 5,
        marginBottom: 5,
        borderRadius: 5,
    },
    backRightBtnLeft: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        top: 0,
        width: 50,
        backgroundColor: '#1f65ff',
        right: 5,
        height: 50,
        borderBottomLeftRadius:5,
        borderTopLeftRadius: 5,
    },
    backRightBtnRight: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        top: 0,
        width: 50,
        backgroundColor: 'red',
        right: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        height: 50,
    },
})
