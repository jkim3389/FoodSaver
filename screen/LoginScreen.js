import React, { useState } from "react";
import { StyleSheet, Image, View, Text, Dimensions, Alert } from "react-native";
import Background from "../components/Background";
import Signin from "../components/Signin";
import Signup from "../components/Signup";


export default function LoginScreen(props) {
    const [isSignUp, setIsSignUp] = useState(false);

    updateStatus = (value)=>{
        setIsSignUp(value)
    }


    let content = isSignUp? <Signup onStatusHandler={updateStatus}/>: <Signin navigation={props.navigation} onStatusHandler={updateStatus}/>

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
            {content}
        </Background>
    );
}

const styles = StyleSheet.create({
    background: {
        justifyContent: "flex-start",
        flexDirection: "column",
    },
    imageContainerSignUp: {
        height: Dimensions.get("window").height * 0.8 - 450,
        marginTop: 100,
    },
    imageContainerLogIn: {
        marginTop: 100,
        height: Dimensions.get("window").height * 0.8 - 350,
    },
    logo: {
        width: 300,
        height: 300,
        alignSelf: "center",
    },

});
