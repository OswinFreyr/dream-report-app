import { StyleSheet } from "react-native";
import * as React from "react";
import { Button } from "react-native-paper";
import { useState } from "react";
import { View, Text } from "react-native";
import { List, TextInput } from "react-native-paper";
import { addPerson } from "@/datas/People";
import { addFeeling } from "@/datas/Feelings";
import { addTheme } from "@/datas/Themes";
import AsyncStorage from "@react-native-async-storage/async-storage";

function addElement(categorie, text) {
  if (categorie === "Personne") {
    addPerson(text);
  } else if (categorie === "Émotion") {
    addFeeling(text);
  } else if (categorie === "Thème") {
    addTheme(text);
  } else {
    console.log("Catégorie non reconnue");
  }
}

export default function Parameters() {
  const [text, setText] = useState("");
  const [categorie, setCategorie] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  const handleCategorySelect = (selectedCategory) => {
    setCategorie(selectedCategory);
    setExpanded(false);
  };

  const handleAddElement = () => {
    addElement(categorie, text);
    setText("");
    setCategorie("");
  };

  const handleClearAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem('dreamFormDataArray');
      console.log('AsyncStorage vidé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'AsyncStorage :', error);
    }
  
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <View style={styles.formContainer}>
        <List.Section>
          <List.Accordion
            title={categorie !== "" ? categorie : "Sélectionner une catégorie"}
            left={(props) => <List.Icon {...props} icon="folder" />}
            expanded={expanded}
            onPress={handlePress}
          >
            <List.Item
              title="Personne"
              onPress={() => handleCategorySelect("Personne")}
            />
            <List.Item
              title="Thème"
              onPress={() => handleCategorySelect("Thème")}
            />
            <List.Item
              title="Émotion"
              onPress={() => handleCategorySelect("Émotion")}
            />
          </List.Accordion>
        </List.Section>
        <TextInput
          label="Intitulé"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <Button mode="contained" onPress={handleAddElement}>
          Ajouter
        </Button>
      </View>
      <Button  onPress={handleClearAsyncStorage} > Vider Async Storage</Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    marginBottom: 20,
  },
  Button: {
    marginTop: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
