import React, { useEffect, useState } from "react";
import { Image, ImageBackground, View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import image from "../assets/background.jpg"
import { SwipeListView } from 'react-native-swipe-list-view';
import { TouchableHighlight } from "react-native-gesture-handler";
import { render } from "react-dom";


export default function ViewItems(props) {

    const [data, setData] = useState([]);
    const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
    useEffect(() => {
        async function readData() {
            try {
                const data = await AsyncStorage.getItem("items");
                if (data != null) {
                    // console.log(JSON.parse(data))
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


    const renderItem = (data, rowMap) => {
        return (
            <View style={styles.rowFront}>
                <Text style={styles.productname}>Item: {data.item.productname}</Text>
                <Text style={styles.expirydate}>Expiration Date: {data.item.expiryDate}</Text>
            </View>
        );
    };

    // const renderHiddenItem = () => {

    // }

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
                    {/* <FlatList
                        data={data}
                        style={styles.flatList}
                        renderItem={(item) => (
                            <View style={styles.list}>
                                <Image source={{uri: item.item.image}}/>
                                <Text>Item : {item.item.productname}</Text>
                                <Text>Expires in {item.item.expiredData} days..</Text>
                            </View>
                        )}
                        scrollEnabled={true}
                    /> */}
                    <SwipeListView
                        data={data}
                        style={styles.flatList}
                        renderItem={renderItem}
                        // renderHiddenItem={renderHiddenItem}
                    >
                    </SwipeListView>
                </View>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    listContainer: {
        alignItems: "center",
        backgroundColor: "red"
    },
    flatList: {
        // backgroundColor: "green",
        width: "100%"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
    list : {
        width: "100%",
        backgroundColor: 'rgba(52, 52, 52, 0.2)',
        marginTop: 10,
        padding: 30,
        alignItems: "center"
    },
    rowFront: {
        backgroundColor: '#FFA07A',
        borderRadius: 5,
        height: 60,
        margin: 5,
        marginBottom: 15,
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
      },
      productname: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#554F41',
      },
      expirydate: {
        fontSize: 20,
        color: '#554F41',
      },
      emptyHeader: {
          fontSize: 48,
          color: '#5F6A6A',
      },
      emptyBody: {
          fontSize: 36,
          color: '#5F6A6A',
      },
      emptyContainer: {
        alignItems: "center",
        
      }
})
