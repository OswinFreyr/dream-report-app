import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput, Button, Switch, Text, Dialog } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SingleDatePicker from "@/components/SingleDatePicker";
import ChipChoice from "@/components/ChipChoice";
import { People } from "@/datas/People";
import { Feelings } from "@/datas/Feelings";
import { Themes } from "@/datas/Themes";

import { useIsFocused } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function DreamForm() {
  const [dreamTitle, setDreamTitle] = useState("");
  const [dreamText, setDreamText] = useState("");
  const [isLucidDream, setIsLucidDream] = useState(false);
  const [date, setDate] = useState(undefined);
  const [people, setPeople] = useState([]);
  const [feelings, setFeelings] = useState([]);
  const [themes, setThemes] = useState([]);
  const [tabInfos, setTabInfos] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    const getPeopleData = async () => {
      const peopleInfo = People.map((e) => e.name);
      setPeople(peopleInfo);
    };
    const getFeelingsData = async () => {
      const feelingsInfo = Feelings.map((e) => e.name);
      setFeelings(feelingsInfo);
    };
    const getThemesData = async () => {
      const themesInfo = Themes.map((e) => e.name);
      setThemes(themesInfo);
    };
    if (isFocused) {
      getPeopleData();
      getFeelingsData();
      getThemesData();
    }
  }, [isFocused]);

  const onToggleSwitch = () => setIsLucidDream(!isLucidDream);

  const handleDreamSubmission = async () => {
    if (!dreamTitle || !dreamText || !date) {
      setDialogVisible(true);
      return;
    }

    try {
      const existingData = await AsyncStorage.getItem("dreamFormDataArray");
      const formDataArray = existingData ? JSON.parse(existingData) : [];
      formDataArray.push({
        dreamTitle,
        dreamText,
        date,
        isLucidDream,
        tabInfos,
      });
      await AsyncStorage.setItem(
        "dreamFormDataArray",
        JSON.stringify(formDataArray)
      );

      // console.log(
      //   "AsyncStorage:",
      //   await AsyncStorage.getItem("dreamFormDataArray")
      // );

      setDreamTitle("");
      setDreamText("");
      setIsLucidDream(false);
      setDate(undefined);
      setTabInfos([]);
      setDialogVisible(false); 
    } catch (error) {
      console.error("Error saving data:", error);
    }
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
        <TextInput
          label="Rentrez un titre à votre rêve"
          value={dreamTitle}
          onChangeText={(text) => setDreamTitle(text)}
        />
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
          <Text style={{ color: "black", marginLeft: 5 }}>Rêve Lucide</Text>
          <SingleDatePicker date={date} setDate={setDate} />
        </View>
        <Text style={{ color: "black" }}>Personnes</Text>
        <View style={styles.choicesContainer}>
          {people.map((name, index) => (
            <ChipChoice key={index} content={name} tabInfos={tabInfos} />
          ))}
        </View>
        <Text style={{ color: "black" }}>Thématiques</Text>
        <View style={styles.choicesContainer}>
          {themes.map((name, index) => (
            <ChipChoice key={index} content={name} tabInfos={tabInfos} />
          ))}
        </View>
        <Text style={{ color: "black" }}>Émotions</Text>
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
      <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
        <Dialog.Title>Champs obligatoires manquants</Dialog.Title>
        <Dialog.Content>
          <Text>Veuillez remplir tous les champs obligatoires. (*)</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setDialogVisible(false)}>
            J'ai compris !
          </Button>
        </Dialog.Actions>
      </Dialog>
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
  },
});
