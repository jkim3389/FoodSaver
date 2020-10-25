import React, { useState } from "react";
import { StyleSheet, Image, View, Text, Dimensions, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// import LoginScreen from "react-native-login-screen";
import logo from "../assets/logo.png";
import Background from "../components/Background";
import Card from "../components/Card";

export default function LoginScreen(props) {
    const [isSignUp, setIsSignUp] = useState(false);

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

    const renderCardContent = () => {
        return isSignUp ? renderSignupCards() : renderLoginCards();
    };

    const renderLoginCards = () => {
        return (
            <View style={styles.contentContainerLogIn}>
                <Card placeholder="username" iconComponent={renderUserIcon()} />
                <Card
                    placeholder="password"
                    iconComponent={renderPasswordIcon()}
                />
                <View style={isSignUp? {...styles.buttonContainer, height:"25%"}:{...styles.buttonContainer, height:"33%"}}>
                <TouchableOpacity style={styles.button} onPress={()=>{Alert.alert("signin clicked")}}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>{setIsSignUp(true)}}>
                    <Text style={styles.buttonText} >Sign Up</Text>
                </TouchableOpacity>
            </View>
            </View>
        );
    };
    const renderSignupCards = () => {
        return (
            <View style={styles.contentContainerSignUp}>
                <Card placeholder="username" iconComponent={renderUserIcon()} />
                <Card
                    placeholder="password"
                    iconComponent={renderPasswordIcon()}
                />
                <Card
                    placeholder="Re-password"
                    iconComponent={renderPasswordIcon()}
                />
            <View style={isSignUp? {...styles.buttonContainer, height:"25%"}:{...styles.buttonContainer, height:"33%"}}>
                <TouchableOpacity style={styles.button} onPress={()=>{setIsSignUp(false)}}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>{setIsSignUp(false)}}>
                    <Text style={styles.buttonText} >Sign Up</Text>
                </TouchableOpacity>
            </View>
            </View>
        );
    };

    return (
        <Background style={styles.background}>
            <View
                style={
                    isSignUp
                        ? styles.imageContainerSignUp
                        : styles.imageContainerLogIn
                }
            >
                <Image
                    source={require("../assets/logo.png")}
                    style={styles.logo}
                />
            </View>

            {renderCardContent()}
        </Background>
    );
}

const styles = StyleSheet.create({
    background: {
        justifyContent: "flex-start",
        flexDirection: "column",
    },
    imageContainerSignUp: {
        // backgroundColor:"yellow",
        // flex:1,
        height: Dimensions.get("window").height * 0.8 - 450,
        marginTop: 100,
    },
    imageContainerLogIn: {
        // backgroundColor:"yellow",
        // flex:1,
        marginTop: 100,
        height: Dimensions.get("window").height * 0.8 - 350,
    },
    logo: {
        width: 300,
        height: 300,
        alignSelf: "center",

        // backgroundColor: "red",
        // flex:1
    },
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
        alignItems:"center",
        // backgroundColor:"red"
    },
    button: {
        // height: "50%",
        // width: "150%",
        flex:1,
        paddingHorizontal:30,
        marginVertical: 20,
        alignItems:"center",
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
