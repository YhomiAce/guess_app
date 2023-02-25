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
  let ButtonComponent = TouchableOpacity;

  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.buttoncontainer}>
      <ButtonComponent activeOpacity={0.6} onPress={onClick}>
        <View style={{ ...styles.button, ...props.style }}>
          <Text style={{ ...styles.buttonText, ...props.textStyle }}>
            {" "}
            {props.children}{" "}
          </Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttoncontainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
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
