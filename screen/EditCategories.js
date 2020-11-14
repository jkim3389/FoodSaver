import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';
import { readData, readDataByOne, storeData, removeDataByOne, readAllData, fbRemoveDataByOne, fbReadAllData } from "../utils/storageManager";

export default class AddItemsManually extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            predefined: "",
        };
    }
    render() {
        return (
            <Background>
                <View style style={styles.container}>
                    <Text style={styles.text}>Category Name </Text>
                    <TextInput
                        style={styles.textInput}
                        clearButtonMode="always"
                        placeholder="Enter Name..."
                        value={this.state.name}
                        onChangeText={(text) => this.setState({ name: text })}
                    />

                    <Text style={styles.text}>Category</Text>
                    <RNPickerSelect
                        onValueChange={(text) =>
                            this.setState({ category: text })
                        }
                        items={categories}
                        value={this.state.category}
                        placeholder={{
                            label: "Select category...",
                            value: null,
                            color: "#9EA0A4",
                        }}
                        style={pickerSelectStyles}
                    />
                    <Text style={styles.text}>Expiry Date</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={
                        (this.props.route.params) ? this.submit : this.submitAndClear
                    }
                >
                    <Text style={styles.buttonText}>Add this item</Text>
                </TouchableOpacity>
            </Background>
        );
    }
}