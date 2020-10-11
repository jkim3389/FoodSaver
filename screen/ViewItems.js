import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import EmptyFridge from "../components/EmptyFridge";
import Background from "../components/Background";
import ItemListView from "../components/ItemListView";
import { readData } from "../utils/storageManager";
import { useIsFocused } from '@react-navigation/native'


export default function ViewItems(props) {
    const {navigation} = props;
    const [data, setData] = useState([]);
    const [isEmptyFridge, setIsEmptyFridge] = useState(true);
    const isFocused = useIsFocused()

    useEffect(() => {
        async function fetch() {
            const dataFromStorage = await readData();
            setData(dataFromStorage);

            if (dataFromStorage.length !== 0 ) {
                setIsEmptyFridge(false);
            } else {
                setIsEmptyFridge(true);
            }
        }
        fetch();
    }, [isFocused]);

    let content = <EmptyFridge navigation={navigation}/>;
    if (!isEmptyFridge) {
        content = <ItemListView data={data} navigation={props.navigation} />;
    }
    return <Background>{content}</Background>;
}

const styles = StyleSheet.create({});
