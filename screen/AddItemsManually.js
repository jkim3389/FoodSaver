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
import { getUID } from "../utils/storageManager"
import { db } from "../utils/config";
import RNPickerSelect from "react-native-picker-select";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import {
  storeData,
  addNewItem,
  schedulePushNotification,
} from "../utils/storageManager";
import { v4 as uuidv4 } from "uuid";
import * as ImagePicker from "expo-image-picker";
import { defaultCategories } from "../components/Categories";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

export default class AddItemsManually extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "../assets/addImage.png",
      name: "",
      category: "None",
      expiryDate: "",
      isDefaultImage: true,
      // predefined: ""
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
      if (!result.cancelled) {
        return result.uri;
      }
      return undefined;
    } else {
      Alert.alert("Need permission for libaray");
    }
  };
  submit = () => {
    if (this.state.name == "") {
      Alert.alert("Item name is required.");
    } else {
      const key = uuidv4();
      var newDate = new Date(this.state.expiryDate);
      var formattedDate = getFormatedDate(newDate, "YYYY/MM/DD");
      // var notifDate = new Date()
      // notifDate.setDate(newDate.getDate()-2)
      // var expireDay = new Date()
      // expireDay.setDate(newDate.getDate())
      // schedulePushNotification(notifDate, expireDay, this.state.name, key)
      var today = new Date(getToday());
      var days_diff = Math.floor(
        (newDate.getTime() - today.getTime()) / 86400000
      );
      const item = {
        key,
        productname: this.state.name,
        expiryDate: days_diff,
        expirationDay: formattedDate,
        image: this.state.image,
      };
      this.props.navigation.goBack();
      this.props.route.params.onSelectData(item);
    }
  };
  submitAndClear = () => {
    if (this.state.name == "") {
      Alert.alert("Item name is required.");
    } else {
      const key = uuidv4();
      var newDate = new Date(this.state.expiryDate);
      var formattedDate = getFormatedDate(newDate, "YYYY/MM/DD");
      var notifDate = new Date();
      notifDate.setDate(newDate.getDate() - 2);
      var expireDay = new Date();
      expireDay.setDate(newDate.getDate());
      var today = new Date(getToday());
      var days_diff = Math.floor(
        (newDate.getTime() - today.getTime()) / 86400000
      );
      const item = {
        key,
        productname: this.state.name,
        expiryDate: days_diff,
        expirationDay: formattedDate,
        image: this.state.image,
      };
      //   storeData(key, item);
      addNewItem(key, item);
      schedulePushNotification(notifDate, expireDay, this.state.name, item.key);
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
              this.pickImage().then((uri) => {
                if (uri) {
                  this.setState({
                    image: uri,
                    isDefaultImage: false,
                  });
                }
              });
            }}
          >
            <Image
              source={
                this.state.isDefaultImage
                  ? require("../assets/addImage.png")
                  : { uri: this.state.image }
              }
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
            onValueChange={(text) => {
              this.setState({ category: text })
              // this.setState({predefined: afterPeriod(
              //   defaultCategories.filter((category) => category.label == "Vegetable")[0].predefined
              // )})
            }}
            items={defaultCategories}
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
            onDateChange={(date) => this.setState({ expiryDate: date })}
            minimumDate={getToday()}
            mode="calendar"
            selected={getToday()}
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
          onPress={this.props.route.params ? this.submit : this.submitAndClear}
        >
          <Text style={styles.buttonText}>Add this item</Text>
        </TouchableOpacity>
      </Background>
    );
  }
}

const getToday = () => {
  var d = new Date()
  var month = d.getMonth() + 1; //To get the Current Month
  return d.getFullYear() + "-" + month + "-" + d.getDate();
};
//Not working correctly
// const afterPeriod = (period) => { 
//   var today = new Date();
//   var date = new Date(today.getFullYear() + period.year, today.getMonth() + period.month, today.getDate() + period.day) 
//   return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
// }

// const Required = () => <Text style={{color:"red", fontSize:10}}>Required</Text>

export const screenOptions = (navData) => {
  return {
    headerTitle: "Adding an Item..",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Back"
          iconName="md-arrow-round-back"
          onPress={() => {
            navData.navigation.goBack();
          }}
        />
      </HeaderButtons>
    ),
    // headerRight: () => (
    //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //         <Item
    //             title="Back"
    //             iconName="md-save"
    //             onPress={() => {
    //                 navData.navigation.navigate("MyFridge");
    //             }}
    //         />
    //     </HeaderButtons>
    // ),
  };
};
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
