import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import TitleText from "./TitleText";

const Header = props => {
    const { title } = props;
    return (
        <View style={styles.header}>
            <TitleText style={styles.headerTitle}>{title} </TitleText>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        color: "white"
    }
});

export default Header;