import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { Image, View, Text, FlatList, StyleSheet, Button, TextInput, TouchableOpacity, Alert } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-modern-datepicker';
import * as ImagePicker from "expo-image-picker";
import NoImage from "../assets/addImage.png"

import Background from "../components/Background";
import { storeData } from "../utils/storageManager";


export default function EditItems({route, navigation}) {
    const {key} = route.params;
    const [data, setData] = useState([]);

    useEffect(() => {
        async function readData() {
            try {
                const data = await AsyncStorage.getItem(key);
                if (data != null) {
                    setData(JSON.parse(data));
                } else {
                    Alert.alert("Failed importing the item");
                    return setData([]);
                }
            } catch(e) {
                console.log("error occured during reading selected data", e);
            }
        }
        readData();
    }, []);

    const submitAndClear = () => {
        if (data.productnamename == '') {
            Alert.alert("Item name is required.");
        } else {            
            storeData(key, data)
            console.log(data);
            Alert.alert(data.productname + " Saved")
            navigation.navigate("My Fridge")
        }
    }

    let imageSection = <Image source={NoImage} style={styles.addImage} />
    if (data.image !== null) {
        imageSection = <Image source={{uri:data.image}} style={styles.addImage} />
    }

    return (
        <Background style={styles.bg}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.image} onPress={() => pickImage().then(uri=>setData({...data, image: uri }))}>
                    {imageSection}
                </TouchableOpacity>

                <Text style={styles.text}>Name </Text>
                <TextInput
                    style={styles.textInput}
                    clearButtonMode='always'
                    value={data.productname}
                    onChangeText={text => setData({...data, productname: text })}
                />

                <Text style={styles.text}>Category</Text>
                <RNPickerSelect
                    onValueChange={text => setData({...data, category: text })}
                    items={categories}
                    placeholder={{
                        label: 'Select category...',
                        value: null,
                        color: '#9EA0A4',
                    }}
                    style={pickerSelectStyles}
                />
                <Text style={styles.text}>Expiry Date</Text>
                <DatePicker
                        style={styles.datePicker}
                        onDateChange={date => setData({...data, expiryDate: date })}
                        minimumDate={getToday()}
                        mode="calendar"
                        // selected={this.state.expiryDate}
                        options={{
                            backgroundColor: '#DCE5A1',
                            // textHeaderColor: '#FFA25B',
                            // textDefaultColor: '#F6E7C1',
                            // selectedTextColor: 'rgba(190, 223, 83, .5)',
                            mainColor: '#1D1C1A',
                            textSecondaryColor: '#1D1C1A',
                            borderColor: '#1D1C1A',
                        }}                        
                    />
            </View>

            <TouchableOpacity style={styles.button} onPress={submitAndClear}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </Background>
    )
}

const getToday = () => {
    var date = new Date().getDate(); //To get the Current Date
    var month = new Date().getMonth() + 1; //To get the Current Month
    var year = new Date().getFullYear(); //To get the Current Year
    return year + "-" + month + "-" + date
}

const pickImage = async () => {
    const grant = await ImagePicker.requestCameraRollPermissionsAsync();
    if (grant) {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            // quality: 1,
        });
        return result.uri;
    } else {
        Alert.alert("Need permission for libaray");
    }
};

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
    bg: {
        width: "100%",
        height: "100%",
        color: "rgba(236, 227, 207, 0.7)",
    },
    container: {
        width: "90%",
        height: "88%",
        backgroundColor: "rgba(236, 227, 207, 0.7)",
        alignSelf: 'center',
        // justifyContent: "center",
        // borderRadius: 20,
    },
    addImage: {
        flex: 1,
        flexWrap: 'wrap',
        width: "80%",
        height: "80%",
        resizeMode: 'contain',
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: 'center',
        margin:10,
        marginBottom:30,
    },
    image: {
        width: 200,
        height: 200,
        
        // backgroundColor: "grey",
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: 'center',
        // borderWidth:2,
        // borderColor: '#1D1C1A',
        // borderRadius: 20,
        marginBottom: -30,
    },
    textInput: {
        height: 40,
        // borderWidth: 2,
        // borderColor: '#1D1C1A',
        paddingLeft: 20,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#DCE5A1',
    },
    datePicker: {
        marginTop: 10,
        width: "90%",
        height: "40%",
        borderRadius: 20,
        alignSelf: "center",
        backgroundColor: '#DCE5A1',
    },
    button: {
        top: -10,
        height: "5%",
        width: "45%",
        justifyContent: "space-evenly",
        alignSelf: 'center',
        backgroundColor: 'rgba(190, 223, 83, .5)',
        marginTop: 20,
        borderRadius: 30,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#1D1C1A',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 40,
        // borderWidth: 2,
        // borderColor: '#1D1C1A',
        paddingLeft: 20,
        margin: 10,
        // borderColor: 'rgba(190, 223, 83, 1)',
        borderRadius: 20,
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: '#DCE5A1',
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

