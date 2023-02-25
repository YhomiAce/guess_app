import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import BodyText from "../components/BodyText";
import CustomButton from "../components/CustomButton";
import TitleText from "../components/TitleText";
import colors from "../constants/colors";

const GameOverScreen = ({ rounds, userChoice, newGame }) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>Game Over!</TitleText>
        <View style={styles.imgContainer}>
          <Image
            //   source={require("../assets/success.png")}
            source={{
              uri: "https://images.unsplash.com/photo-1534685785745-60a2cea0ec34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3VtbWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.space}>
            Your phone needed <Text style={styles.highlight}>{rounds}</Text>{" "}
            rounds to guess the number{" "}
            <BodyText style={styles.highlight}>{userChoice}</BodyText>{" "}
          </BodyText>
        </View>

        {/* <Button title="New Game" onPress={newGame} /> */}
        <CustomButton onClick={newGame}>New Game</CustomButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imgContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30,
  },
  space: {
    margin: 10,
    textAlign: "center",
    fontSize: 20,
    marginVertical: 15,
  },
  highlight: {
    color: colors.primary,
    fontFamily: "open-sans-bold",
  },
  resultContainer: {
    marginHorizontal: 20,
    alignItems: "center",
  },
});

export default GameOverScreen;
