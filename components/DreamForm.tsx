import { View, StyleSheet, Dimensions } from "react-native";
import { TextInput, Button, Checkbox, Switch } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TitleInput from "@/components/TitleInput";
import { fr, registerTranslation } from "react-native-paper-dates";
registerTranslation("fr", fr);
import SingleDatePicker from "@/components/SingleDatePicker";
import ChipChoice from "@/components/ChipChoice";
import { useState, useEffect } from 'react';

const { width } = Dimensions.get("window");

export default function DreamForm() {

  const [dreamText, setDreamText] = useState("");
  const [isLucidDream, setIsLucidDream] = useState(false);

  const [people, setPeople] = useState([]);
  const [feelings, setFeelings] = useState([]);
  const [themes, setThemes] = useState([]);

  const [tabInfos, setTabInfos] = useState([]);


  useEffect(() => {
    const getPeopleData = async () => {
        const response = await fetch("../datas/People.json");
        const peopleData = await response.json();
        const peopleInfo = await peopleData.People.map((e) => e.name)

        setPeople(peopleInfo)
    }
    getPeopleData()
    const getFeelingsData = async () => {
      const response = await fetch("../datas/Feelings.json");
      const feelingsData = await response.json();
      const feelingsInfo = await feelingsData.Feelings.map((e) => e.name)

      setFeelings(feelingsInfo)
    }
    getFeelingsData()
    const getThemesData = async () => {
      const response = await fetch("../datas/themes.json");
      const themesData = await response.json();
      console.log(themesData);
      
      const themesInfo = await themesData.Themes.map((e) => e.name)

      setThemes(themesInfo)
    }
    getThemesData()

  }, []);
  
  const onToggleSwitch = () => {
    setIsLucidDream(!isLucidDream)
    console.log(tab);
    
  };

  
  const handleResetDreams = async () => {};
  const handleDreamSubmission = async () => {
    // Logique de traitement de la soumission du rêve
    // console.log("Rêve soumis:", dreamText, "Lucide:", isLucidDream);
    try {
      // Récupérer le tableau actuel depuis AsyncStorage
      const existingData = await AsyncStorage.getItem("dreamFormDataArray");
      const formDataArray = existingData ? JSON.parse(existingData) : [];
      // Ajouter le nouveau formulaire au tableau
      formDataArray.push({ dreamText, isLucidDream, tabInfos });
      // Sauvegarder le tableau mis à jour dans AsyncStorage
      await AsyncStorage.setItem(
        "dreamFormDataArray",
        JSON.stringify(formDataArray)
      );
      console.log(
        "AsyncStorage: ",
        await AsyncStorage.getItem("dreamFormDataArray")
      );
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des données:", error);
    }
    // Réinitialisation du formulaire
    setDreamText("");
    setIsLucidDream(false);
  };

  return (
    <View style={styles.container}>
      <TitleInput />
      <TextInput
        label="Rêve"
        value={dreamText}
        onChangeText={(text) => setDreamText(text)}
        mode="outlined"
        multiline
        numberOfLines={6}
        style={[styles.input, { width: width * 0.8, alignSelf: "center" }]}
      />
      <View style={styles.checkboxContainer}>
        {/* <Checkbox.Item
                label="Rêve Lucide"
                status={isLucidDream ? "checked" : "unchecked"}
                onPress={() => setIsLucidDream(!isLucidDream)}
            /> */}
        <Switch value={isLucidDream} onValueChange={onToggleSwitch} />
        <p>Rêve Lucide</p>
        <SingleDatePicker />
        
      </View>
      <View style={styles.choicesContainer}>
        {people.map((name, index) => (
          <ChipChoice key={index} content={name} tabInfos={tabInfos} />
        ))}
      </View>
      <View style={styles.choicesContainer}>
        {themes.map((name, index) => (
          <ChipChoice key={index} content={name} tabInfos={tabInfos} />
        ))}
      </View>
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
      <Button
        mode="contained"
        onPress={handleResetDreams}
        style={styles.button}
      >
        Reset Dreams
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  },
  choicesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  }
});
