import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ScreenOrientation from 'expo-screen-orientation';

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
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  ScreenOrientation.getO
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [deviceLayoutWidth, setDeviceLayoutWidth] = useState(Dimensions.get('window').width);
  const [deviceLayoutHeight, setDeviceLayoutHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const updateLayout = () => {
      setDeviceLayoutHeight(Dimensions.get('window').height);
      setDeviceLayoutWidth(Dimensions.get('window').width)
    }
    const layoutChange = Dimensions.addEventListener('change', updateLayout);
    return () => layoutChange.remove()
  })



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

  let listContainerStyle = styles.listContainer;
  if (deviceLayoutWidth < 350) {
    listContainerStyle = styles.listContainerBig;
  }

  if (deviceLayoutHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={defaultStyles.title}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <CustomButton onClick={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </CustomButton>
          <CustomText>{currentGuess}</CustomText>
          <CustomButton onClick={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-add" size={24} color="white" />
          </CustomButton>
        </View>
        <View style={listContainerStyle}>
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
  }

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
      <View style={listContainerStyle}>
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
    marginTop: Dimensions.get("window").height > 600 ? 30 : 5,
    width: 400,
    maxWidth: "90%",
    marginHorizontal: 20,
  },
  listContainer: {
    flex: 1,
    width: "60%",
  },
  listContainerBig: {
    flex: 1,
    width: "80%",
  },
  list: {
    // alignItems: "center",
    justifyContent: "flex-end",
    flexGrow: 1,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center",
  },
});

export default GameScreen;
