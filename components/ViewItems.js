import React, { useEffect, useState } from "react";
import { ImageBackground, View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import image from "../assets/background.jpg"

export default function FridgeView(props) {

    const [data, setData] = useState([]);
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

    if (data.length == 0 ) {
        return (
            <Text>
                Empty!!!!!!!!
            </Text>
        )
    } else {
        return (
            <ImageBackground source={image} style={styles.image}>
                <FlatList
                    data={data}
                    style={styles.flatList}
                    renderItem={(item) => (
                        <View style={styles.list}>
                            <Text>Item : {item.item.productname}</Text>
                            <Text>Expires in {item.item.expiredData} days..</Text>
                        </View>
                    )}
                    scrollEnabled={true}
                />
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
        marginTop: 20,
        padding: 30,
        alignItems: "center"
    }
})
