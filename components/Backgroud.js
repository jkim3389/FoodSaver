import React from "react";
import { StyleSheet, ImageBackground } from "react-native";

export default function Background(props) {
    return (
        <ImageBackground
            source={require("../assets/background.jpg")}
            style={{ ...styles.image, ...props.style }}
        >
            {props.children}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
});
