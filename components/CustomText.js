import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from '../constants/colors'

const CustomText = (props) => {
  return (
    <View style={styles.conatiner}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    conatiner: {
        borderWidth: 2,
        borderColor: Colors.accent,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    number: {
        color: Colors.accent,
        fontSize: 22,
    }
})

export default CustomText;
