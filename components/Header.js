import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Colors from "../constants/colors";
import TitleText from "./TitleText";

const Header = (props) => {
  const { title } = props;
  return (
    <View style={{...styles.headerBase, ...Platform.select({
        ios: styles.headerIos,
        android: styles.headerAndroid 
    })}}>
      <TitleText style={styles.headerTitle}>{title} </TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center",
    
  },
  headerIos: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
    borderBottomColor: "transparent",
    borderBottomWidth: 2,
  },
  headerTitle: {
    color: "white",
  },
});

export default Header;
