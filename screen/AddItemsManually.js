import Background from "../components/Background";
import React, { Component } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TextInput,
    Image,
    Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DatePicker from "react-native-modern-datepicker";
import { storeData, addNewItem } from "../utils/storageManager";
import { v4 as uuidv4 } from "uuid";
import * as ImagePicker from "expo-image-picker";

export default class AddItemsManually extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '../assets/addImage.png',
            name: "",
            category: "None",
            expiryDate: "",
            isDefaultImage : true
        };
    }
     pickImage = async () => {
        const grant = await ImagePicker.requestCameraRollPermissionsAsync();
        if (grant) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                // quality: 1,
            });
            if(!result.cancelled){
                return result.uri
            }
            return undefined
        } else {
            Alert.alert("Need permission for libaray");
        }
    };
    submit = ()=>{
        if (this.state.name == "") {
            Alert.alert("Item name is required.");
        } else {
            const key = uuidv4();
            var newDate = new Date(this.state.expiryDate)
            var today = new Date(getToday())
            var days_diff = Math.floor((newDate.getTime() - today.getTime())/(86400000))
            const item = {
                key,
                productname: this.state.name,
                expiryDate: days_diff,
                image: this.state.image,
            };
            this.props.navigation.goBack()
            this.props.route.params.onSelectData(item);
        }

    }
    submitAndClear = () => {
        if (this.state.name == "") {
            Alert.alert("Item name is required.");
        } else {
            console.debug(this.state.image);
            const key = uuidv4();
            var newDate = new Date(this.state.expiryDate)
            var today = new Date(getToday())
            var days_diff = Math.floor((newDate.getTime() - today.getTime())/(86400000))
            const item = {
                key,
                productname: this.state.name,
                expiryDate: days_diff,
                image: this.state.image,
            };

            storeData(key, item);
            addNewItem(key, item);
            Alert.alert(this.state.name + " Added");
            this.props.navigation.navigate("Add Items");
        }
    };

    render() {

        return (
            <Background>
                <View style style={styles.container}>
                    <TouchableOpacity
                        style={styles.image}
                        onPress={() => {
                            this.pickImage().then((uri) =>
                                {if(uri){
                                    this.setState({ image: uri, isDefaultImage:false })
                                }}
                            );
                        }}
                    >
                        <Image
                            source={this.state.isDefaultImage? require('../assets/addImage.png'): { uri: this.state.image }}
                            style={styles.addImage}
                        />
                    </TouchableOpacity>

                    <Text style={styles.text}>Name </Text>
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
                    <DatePicker
                        style={styles.datePicker}
                        onDateChange={(date) =>
                            this.setState({ expiryDate: date })
                        }
                        minimumDate={getToday()}
                        mode="calendar"
                        selected={this.state.expiryDate}
                        options={{
                            backgroundColor: "#DCE5A1",
                            // textHeaderColor: '#FFA25B',
                            // textDefaultColor: '#F6E7C1',
                            // selectedTextColor: 'rgba(190, 223, 83, .5)',
                            mainColor: "#1D1C1A",
                            textSecondaryColor: "#1D1C1A",
                            borderColor: "#1D1C1A",
                        }}
                    />
                    {/* <Text>{this.state.expiryDate - today}</Text> */}
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={
                        (this.props.route.params)?this.submit:this.submitAndClear
                        }
                >
                    <Text style={styles.buttonText}>Add this item</Text>
                </TouchableOpacity>
            </Background>
        );
    }
}
const getToday = () => {
    var date = new Date().getDate(); //To get the Current Date
    var month = new Date().getMonth() + 1; //To get the Current Month
    var year = new Date().getFullYear(); //To get the Current Year
    return year + "-" + month + "-" + date;
};



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
        width: "90%",
        height: "88%",
        backgroundColor: "rgba(236, 227, 207, 0.7)",
        alignSelf: "center",
        // justifyContent: "center",
        // borderRadius: 20,
    },
    addImage: {
        width: "80%",
        height: "80%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
        // backgroundColor: "grey",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        // borderWidth:2,
        // borderColor: '#1D1C1A',
        // borderRadius: 20,
        marginBottom: -30,
    },
    text: {
        left: 25,
        marginBottom: -5,
        color: "#1D1C1A",
        fontFamily: "Arial Rounded MT Bold",
    },
    textInput: {
        height: 40,
        // borderWidth: 2,
        // borderColor: '#1D1C1A',
        paddingLeft: 20,
        margin: 10,
        borderRadius: 20,
        backgroundColor: "#DCE5A1",
    },
    datePicker: {
        marginTop: 10,
        width: "90%",
        height: "40%",
        borderRadius: 20,
        alignSelf: "center",
        backgroundColor: "#DCE5A1",
    },
    button: {
        top: -10,
        height: "5%",
        width: "45%",
        justifyContent: "space-evenly",
        alignSelf: "center",
        backgroundColor: "rgba(190, 223, 83, .5)",
        marginTop: 20,
        borderRadius: 30,
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#1D1C1A",
        textAlign: "center",
        textTransform: "uppercase",
    },
});

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
        backgroundColor: "#DCE5A1",
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: "purple",
        borderRadius: 8,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
