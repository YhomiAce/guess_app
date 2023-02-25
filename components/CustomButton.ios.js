import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import colors from "../constants/colors";

const CustomButton = (props) => {
  const { onClick } = props;

  return (
      <TouchableOpacity activeOpacity={0.6} onPress={onClick}>
        <View style={{ ...styles.button, ...props.style }}>
          <Text style={{ ...styles.buttonText, ...props.textStyle }}>
            {" "}
            {props.children}{" "}
          </Text>
        </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
  },
});

export default CustomButton;
