import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { Image, View, Text, FlatList, StyleSheet, Button } from "react-native";


export default function EditItems({route, navigation}) {
    const {keyNumber} = route.params;
    const {selectedData} = route.params;
    const [data, setData] = useState([]);

    useEffect(() => {
        async function readData() {
            try {
                const data = await AsyncStorage.getItem("items");
                if (data != null) {
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

    const getItem = async ()=>{
        // const newData = [...data];
        // const prevIndex = data.findIndex(item => item.key === key);
        // newData.splice(prevIndex,1);
        // setData(newData);
        // await AsyncStorage.setItem("items",JSON.stringify(newData));
        // const selectedData = newData[prevIndex];
        console.log(selectedData);
        // return selectedData;

    }
    // const tempData = getItem(keyNumber);
    
    
    return (
        <View>
            <Text>The item's key is {keyNumber} </Text>
            {/* <Button onPress={getItem} title={"Hi"}></Button> */}
        </View>
    )
}