import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import EmptyFridge from "../components/EmptyFridge";
import Background from "../components/Background";
import { useIsFocused } from '@react-navigation/native'
import { readAllData, fbReadAllData } from "../utils/storageManager";
import { db } from "../utils/config";
import NonEmptyFridge from "../components/NonEmptyFridge";

export default function ViewItems(props) {
    const [data, setData] = useState([]);
    const [isEmptyFridge, setIsEmptyFridge] = useState(true);
    const isFocused = useIsFocused()
    const [didMount, setDidMount] = useState(false); 

    useEffect(() => {
        // async function fetch() {
        //     const dataFromStorage = await readAllData();
        //     setData(dataFromStorage);
        //     if (dataFromStorage.length !== 0 ) {
        //         setIsEmptyFridge(false);
        //     } else {
        //         setIsEmptyFridge(true);
        //     }
        // }
        // fetch();
        setDidMount(true)
        // if (mounted) {
            db.ref("/items").on("value", (dataSnapshot) => {
                let data = dataSnapshot.val() ? dataSnapshot.val() : {};
                let items = Object.values(data);
                setData(items);
                if (items.length !== 0 ) {
                    setIsEmptyFridge(false);
                } else {
                    setIsEmptyFridge(true);
                }
            });
        // }
        return () => setDidMount(false);
    }, []);

    const updateData = (itemList) => {
        setData(itemList);
    }

    let content = <EmptyFridge navigation={props.navigation}/>;
    if (!isEmptyFridge) {
        // content = <ItemListView data={data} navigation={props.navigation} updateData = {updateData}/>;
        content = <NonEmptyFridge data={data} navigation={props.navigation} updateData = {updateData}/>;
    }
    return <Background>{content}</Background>;
}

const styles = StyleSheet.create({});
