import React from "react";
import {
    StyleSheet,
    TouchableHighlight,
    View,
    Image,
    Text,
} from "react-native";
export default function VisibleItem({ data }) {
    return (
        <TouchableHighlight>
            <View style={styles.rowFront}>
                <Image
                    source={{ uri: data.image }}
                    style={styles.image}
                    resizeMode="contain"
                />
                <View style={styles.contentContainer}>
                    <Text style={styles.productname}>{data.productname}</Text>
                    <Text style={styles.expiryDate}>
                        Expiry Date: {data.expiryDate} days left
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    rowFront: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "rgb(52, 52, 52)",
        borderRadius: 5,
        height: 100,
        margin: 5,
        marginBottom: 5,
        shadowColor: "#999",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    productname: {
        fontSize: 20,
        marginBottom: 5,
        color: "#f2e6d7",
        fontFamily: "Arial Rounded MT Bold",
    },
    expiryDate: {
        fontSize: 15,
        color: "#f2e6d7",
    },
    image: {
        width: 90,
        height: 90,
        flex: 2,
    },
    contentContainer: {
        // backgroundColor:"blue",
        flex: 5,
        paddingLeft: 15,
    },
});
