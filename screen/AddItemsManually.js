import Background from "../components/Background";
import React, { Component, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Button, TextInput, Alert } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { Datepicker, useStyleSheet } from '@ui-kitten/components';

export default class AddItemsManually extends Component {
    constructor(props) {
        super(props)
        this.state = { name: '', category: 'None', expiryDate: null }
    }

    submitAndClear = () => {
        if (this.state.name == '') {
            Alert.alert("Item name is required.");
        } else {
            //   this.props.writeText(this.state.text)
            console.log(this.state.category)
            Alert.alert(this.state.name + " Added")
            this.setState({
                name: '', category: null, expiryDate: null
            })
        }
    }

    render() {
        return (
            <Background style={styles.container}>
                <View style={styles.image} />
                <Text style={styles.text}>Name </Text>
                <TextInput
                    style={styles.textInput}
                    clearButtonMode='always'
                    placeholder='Enter Name...'
                    value={this.state.name}
                    onChangeText={text => this.setState({ name: text })}
                />
                <Text style={styles.text}>Category</Text>
                <RNPickerSelect
                    onValueChange={text => this.setState({ category: text })}
                    items={categories}
                    value={this.state.category}
                    placeholder={{
                        label: 'Select category...',
                        value: null,
                        color: '#9EA0A4',
                    }}
                    style={pickerSelectStyles}
                />
                <Text style={styles.text}>Expiry Date</Text>
                <Datepicker style={styles.datePicker}
                    placement='bottom'
                    date={this.state.expiryDate}
                    onSelect={date => this.setState({ expiryDate: date })}
                />
                {/* <Text>{this.state.expiryDate - today}</Text> */}
                <Button
                    onPress={this.submitAndClear}
                    title='Add this item'
                    color='#841584'
                />
            </Background>
        )
    }
}
// const Required = () => <Text style={{color:"red", fontSize:10}}>Required</Text>
const categories = [
    { label: "None", value: "None" },
    { label: "Fruit", value: "Fruit" },
    { label: "Vegetable", value: "Vegetable" },
    { label: "Dairy", value: "Diary" },
    { label: "Meat", value: "Meat" },
    { label: "Canned food", value: "Canned food" },
    { label: "Snack", value: "Snack" },
];

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        color: "rgba(236, 227, 207, 0.7)",
    },
    image: {
        width: 200,
        height: 200,
        backgroundColor: "grey",
        alignSelf: 'center',
        justifyContent: "center",
        borderRadius: 20,
    },
    text: {
        left: 25,
        marginBottom: -5,
        color: '#1D1C1A',
        fontFamily: 'Arial Rounded MT Bold',
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#1D1C1A',
        paddingLeft: 20,
        margin: 10,
        borderRadius: 20,
    },
    datePicker: {
        marginTop: 10,
        width: "95%",
        alignSelf: "center",
        color: "black"

    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 40,
        borderWidth: 1,
        borderColor: '#1D1C1A',
        paddingLeft: 20,
        margin: 10,
        // borderColor: 'rgba(190, 223, 83, 1)',
        borderRadius: 20,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
