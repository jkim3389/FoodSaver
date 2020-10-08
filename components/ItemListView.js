import React from "react";
import {View, Text,  StyleSheet, TouchableHighlight} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
export default function ItemListView(props) {
    
    const renderItem = ({item}, rowMap) => {
        return (
            <TouchableHighlight>
                <View style={styles.rowFront}>
                    <Text style={styles.productname}>{item.productname}</Text>
                    <Text style={styles.expirydate}>Expiration Date: {item.expiryDate} days left</Text>
                </View>
            </TouchableHighlight>
        );
    };
    return (
        <View>
            <SwipeListView
                data={props.data}
                style={{...styles.flatList, ...props.style}}
                renderItem={renderItem}
                scrollIndicatorInsets={{ right: 1 }}
                // renderHiddenItem={renderHiddenItem}
            />
        </View>
    );
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
    list : {
        width: "100%",
        backgroundColor: 'rgba(52, 52, 52, 0.2)',
        marginTop: 10,
        padding: 30,
        alignItems: "center"
    },
    rowFront: {
        backgroundColor: '#C3BEB1',
        borderRadius: 5,
        height: 60,
        margin: 4,
        marginBottom: 5,
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        paddingHorizontal: 10,

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
    
})
