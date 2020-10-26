import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import { auth } from "../utils/config";
import Card from "../components/Card";

const initialState = {
    username: "",
    password: "",
    re_password: "",
};
export default function Signup(props) {
    const [userInput, setUserInput] = useState(initialState);
    const renderUserIcon = () => (
        <Image
            source={require("../assets/icons/user.png")}
            style={styles.iconImageStyle}
        />
    );

    const renderPasswordIcon = () => (
        <Image
            source={require("../assets/icons/password.png")}
            style={styles.iconImageStyle}
        />
    );

    const registerUser = () => {
        if (
            userInput.username === "" ||
            userInput.password === "" ||
            userInput.re_password === ""
        ) {
            Alert.alert("fill out every fields");
        } else if (userInput.password !== userInput.re_password) {
            Alert.alert("the password should be matched");
            // console.log("password", userInput);
        } else {
            auth.createUserWithEmailAndPassword(
                userInput.username,
                userInput.password
            )
                .then((res) => {
                    setUserInput(initialState);
                    props.onStatusHandler(false);
                    Alert.alert("The User is successfully registered!");
                })
                .catch((e) => Alert.alert(e.message));
        }
    };
    return (
        <View style={styles.contentContainerSignUp}>
            <Card
                placeholder="username"
                iconComponent={renderUserIcon()}
                value={userInput.username}
                onChangeText={(text) => {
                    setUserInput({ ...userInput, username: text });
                }}
            />
            <Card
                placeholder="password"
                iconComponent={renderPasswordIcon()}
                value={userInput.password}
                onChangeText={(text) =>
                    setUserInput({ ...userInput, password: text })
                }
                secureTextEntry={true}
            />
            <Card
                placeholder="Re-password"
                iconComponent={renderPasswordIcon()}
                value={userInput.re_password}
                onChangeText={(text) =>
                    setUserInput({ ...userInput, re_password: text })
                }
                secureTextEntry={true}
            />
            <View style={{ ...styles.buttonContainer, height: "25%" }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        props.onStatusHandler(false);
                        setUserInput(initialState);
                    }}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        registerUser();
                    }}
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainerSignUp: {
        // flex: 2,
        // marginHorizontal: 30,
        alignSelf: "center",
        // marginVertical: 50,
        // justifyContent:'flex-end',
        borderRadius: 24,
        backgroundColor: "rgba(255,255,255,0.5)",
        width: Dimensions.get("window").width * 0.9,
        height: 350,
        padding: 10,
        // bottom: Dimensions.get("window").height * 0.10,
    },
    iconImageStyle: {
        width: 30,
        height: 30,
    },
    buttonContainer: {
        // width:"100%",
        // height:"33%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        // backgroundColor:"red"
    },
    button: {
        // height: "50%",
        // width: "150%",
        // flex: 1,

        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, .5)",
        // marginVertical: 30,
        borderRadius: 10,
    },
    buttonText: {
        fontWeight: "bold",
        fontFamily: "Arial Rounded MT Bold",
        fontSize: 25,
        color: "#FFFFFF",
        textAlign: "center",
        textTransform: "capitalize",
    },
});
