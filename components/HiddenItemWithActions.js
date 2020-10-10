import React from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import IconEvilIcons from 'react-native-vector-icons/EvilIcons'
export default function HiddenItemWithActions(props) {
    return (
        <View style={styles.rowBack}>
                <TouchableOpacity style={styles.backRightBtnLeft} onPress = {props.onEdit} > 
                    <IconEvilIcons name="pencil" size={35}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backRightBtnRight} onPress = {props.onDelete}>
                    <IconEvilIcons name="trash" size={35}/>
                </TouchableOpacity>
            </View>
    )
}


const styles = StyleSheet.create({
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
    backRightBtnLeft :{
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
    backRightBtnRight :  {
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
    }
})