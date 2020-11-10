import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    Alert,
} from "react-native";
import { auth } from "../utils/config";
import Card from "../components/Card";
export default function Signin(props) {
    const [userInput, setUserInput] = useState({
        username: "",
        password: "",
    });
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
    const userLogin = () => {
        if (userInput.username === "" || userInput.password === "") {
            Alert.alert("fill out every fields");
        } else {
            auth.signInWithEmailAndPassword(
                userInput.username,
                userInput.password
            )
                .then((res) => {
                    console.log(res);
                    Alert.alert("User is successfully logged in");
                    props.navigation.navigate("TabBar");
                })
                .catch((e) => {
                    Alert.alert(e.message);
                });
        }
    };
    return (
        <View style={styles.contentContainerLogIn}>
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
                onChangeText={(text) => {
                    setUserInput({ ...userInput, password: text });
                }}
                secureTextEntry={true}
            />
            <View style={{ ...styles.buttonContainer, height: "33%" }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        userLogin();
                    }}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        props.onStatusHandler(true);
                    }}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainerLogIn: {
        // flex: 2,
        // marginHorizontal: 30,
        alignSelf: "center",
        // marginVertical: 50,
        // justifyContent:'flex-end',
        borderRadius: 24,
        backgroundColor: "rgba(255,255,255,0.5)",
        width: Dimensions.get("window").width * 0.9,
        height: 250,
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
        // marginVertical: 20,
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
