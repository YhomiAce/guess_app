import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Card from "../components/Card";
import CustomButton from "../components/CustomButton";
import CustomText from "../components/CustomText";
import defaultStyles from "../constants/default-styles";
import BodyText from "../components/BodyText";
import PastGuess from "../components/PastGuess";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  const { userChoice, onGameOver } = props;
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      setPastGuesses([]);
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        {
          text: "Sorry!",
          style: "cancel",
        },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds((currentRound) => currentRound + 1);
    setPastGuesses((currPastGuess) => [nextNumber, ...currPastGuess]);
  };

  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.title}>Opponent's Guess</Text>
      <CustomText>{currentGuess}</CustomText>
      <Card style={styles.buttonContainer}>
        {/* <Button title="Lower" onPress={nextGuessHandler.bind(this, "lower")} /> */}
        <CustomButton onClick={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </CustomButton>
        <CustomButton onClick={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </CustomButton>
        {/* <Button
          title="Greater"
          onPress={nextGuessHandler.bind(this, "greater")}
        /> */}
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => (
            <PastGuess key={index + 1} guess={guess} index={pastGuesses.length - index} />
          ))}
        </ScrollView> */}
        <FlatList
          data={pastGuesses}
          keyExtractor={(item) => item.toString()}
          renderItem={(itemData) => (
            <PastGuess
              guess={itemData.item}
              index={pastGuesses.length - itemData.index}
            />
          )}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 400,
    maxWidth: "90%",
    marginHorizontal: 20,
  },
  listContainer: {
    width: "60%",
    flex: 1,
  },
  list: {
    // alignItems: "center",
    justifyContent: "flex-end",
    flexGrow: 1,
  },
});

export default GameScreen;
