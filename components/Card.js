import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextField } from "@freakycoder/react-native-material-textfield";
export default function Card(props) {
    return (
        <View style={styles.container}>
            <View style={styles.containerGlue}>
                <View style={styles.iconContainer}>{props.iconComponent}</View>
                <View style={styles.textContainer}>
                    <TextField
                        {...props}
                        value={props.value}
                        label={props.placeholder}
                        onChangeText={props.onChangeText}
                        secureTextEntry={props.secureTextEntry}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 8,
        height: 75,
        width: "95%",
        marginTop: 0,
        borderRadius: 24,
        justifyContent: "center",
        backgroundColor: "white",
      },
      containerGlue: {
        marginLeft: 24,
        marginRight: 24,
        flexDirection: "row",
      },
      textContainer: {
        bottom: 3,
        width: "80%",
        marginLeft: 12,
        flexDirection: "column",
        justifyContent: "center",
        // marginTop: isAndroid ? 10 : undefined,
      },
      iconContainer: {
        width: 35,
        justifyContent: "center",
      },
})