import React from "react";
import { View, StyleSheet } from "react-native";
import BodyText from "./BodyText";

const PastGuess = (props) => {
  const { guess, index } = props;
  return (
    <View style={styles.listItem}>
      <BodyText>#{index}:</BodyText>
      <BodyText>{guess}</BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    padding: 15,
    borderColor: "black",
    borderWidth: 1,
    marginVertical: 10,
    backgroundColor: "white",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default PastGuess;
