import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput, Button, Switch, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TitleInput from "@/components/TitleInput";
import { fr, registerTranslation } from "react-native-paper-dates";
import SingleDatePicker from "@/components/SingleDatePicker";
import ChipChoice from "@/components/ChipChoice";

const { width } = Dimensions.get("window");

export default function DreamForm() {
  const [dreamText, setDreamText] = useState("");
  const [isLucidDream, setIsLucidDream] = useState(false);
  const [people, setPeople] = useState([]);
  const [feelings, setFeelings] = useState([]);
  const [themes, setThemes] = useState([]);
  const [tabInfos, setTabInfos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePeople = await fetch("../datas/People.json");
        const responseFeelings = await fetch("../datas/Feelings.json");
        const responseThemes = await fetch("../datas/themes.json");

        const peopleData = await responsePeople.json();
        const feelingsData = await responseFeelings.json();
        const themesData = await responseThemes.json();

        setPeople(peopleData.People.map((e) => e.name));
        setFeelings(feelingsData.Feelings.map((e) => e.name));
        setThemes(themesData.Themes.map((e) => e.name));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onToggleSwitch = () => setIsLucidDream(!isLucidDream);

  const handleDreamSubmission = async () => {
    try {
      const existingData = await AsyncStorage.getItem("dreamFormDataArray");
      const formDataArray = existingData ? JSON.parse(existingData) : [];
      formDataArray.push({ dreamText, isLucidDream, tabInfos });
      await AsyncStorage.setItem(
        "dreamFormDataArray",
        JSON.stringify(formDataArray)
      );
      console.log(
        "AsyncStorage:",
        await AsyncStorage.getItem("dreamFormDataArray")
      );
    } catch (error) {
      console.error("Error saving data:", error);
    }

    setDreamText("");
    setIsLucidDream(false);
    setTabInfos([]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <TitleInput />
        <TextInput
          label="Rêve"
          value={dreamText}
          onChangeText={(text) => setDreamText(text)}
          mode="outlined"
          multiline
          numberOfLines={6}
          style={[styles.input, { width: width * 0.8 }]}
        />
        <View style={styles.checkboxContainer}>
          <Switch value={isLucidDream} onValueChange={onToggleSwitch} />
          <Text>Rêve Lucide</Text>
          <SingleDatePicker />
        </View>
        <Text>Personnes</Text>
        <View style={styles.choicesContainer}>
          {people.map((name, index) => (
            <ChipChoice key={index} content={name} tabInfos={tabInfos} />
          ))}
        </View>
        <Text>Thématiques</Text>
        <View style={styles.choicesContainer}>
          {themes.map((name, index) => (
            <ChipChoice key={index} content={name} tabInfos={tabInfos} />
          ))}
        </View>
        <Text>Émotions</Text>
        <View style={styles.choicesContainer}>
          {feelings.map((name, index) => (
            <ChipChoice key={index} content={name} tabInfos={tabInfos} />
          ))}
        </View>
        <Button
          mode="contained"
          onPress={handleDreamSubmission}
          style={styles.button}
        >
          Soumettre
        </Button>
        <Button mode="contained" onPress={() => {}} style={styles.button}>
          Reset Dreams
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 8,
  },
  choicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 16,
    // justifyContent: "space-around",
  },
});
