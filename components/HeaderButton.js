import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
// import Colors from "../../constants/Colors";

export default function CustomHeaderButton(props) {
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={23}
            color="#1D1C1A"
        />
    );
}
