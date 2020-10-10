import React, { useEffect, useState } from "react";
import { Image, ImageBackground, View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import image from "../assets/background.jpg"
import { SwipeListView } from 'react-native-swipe-list-view';
import noItems from "../assets/noItems.png"
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import IconEvilIcons from 'react-native-vector-icons/EvilIcons'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function ViewItems(props) {

    const {navigation} = props;
    const [data, setData] = useState([]);
    const BoldText = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
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

    if (data.length == 0 ) {
        return (
            <ImageBackground source={image} style={styles.image}>
                <View style={styles.emptyContainer}>
                    <Image source={noItems}  style={styles.noItems}/>
                    <Text style={styles.emptyHeader}>No items..</Text>
                    <Text> </Text>
                    <Text style={styles.emptyBody}>Please add items.</Text>
                </View>
            </ImageBackground>
        )
    } else {
        return (
            <ImageBackground source={image} style={styles.image}>
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
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    flatListView: {
        width: "100%",
        height: "100%",
        backgroundColor:'rgba(236, 227, 207, 0.7)',
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
        justifyContent:'center'
    },
    productname: {
        fontSize: 20,
        marginBottom: 5,
        color: "#f2e6d7",
        fontFamily: 'Arial Rounded MT Bold',
    },
    expirydate: {
        fontSize: 15,
        color: "#f2e6d7"
    },
    emptyHeader: {
        fontSize: 30,
        color: '#5F6A6A',
        fontFamily: 'Arial Rounded MT Bold'
    },
    emptyBody: {
        marginTop:-10,
        fontSize: 20,
        color: '#5F6A6A',
        fontFamily: 'Arial Rounded MT Bold'
    },
    emptyContainer: {
        alignItems: "center",
    },
    noItems: { 
        top: -30,
        width: 200, 
        height: 200, 
        justifyContent: "center", 
        alignItems: "center",
        marginBottom: -20,
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
    addItembtn: {
        backgroundColor: '#FBFCFC',
        borderRadius: 5,
        height: 60,
        margin: 5,
        flexDirection:'row',
    },
    addItembtnText: {
        alignItems:'center',
        fontSize:25,
        paddingLeft:10,
        color:'#797D7F',
        alignSelf:'center',
    }, 
})
