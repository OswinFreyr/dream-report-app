import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DreamAnalysis() {
  const [apiResponse, setApiResponse] = useState(null);
  const [dreams, setDreams] = useState([]);
  const [filteredDreams, setFilteredDreams] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchDreamsFromStorage();
  }, []);

  const fetchDreamsFromStorage = async () => {
    try {
      const dreamFormDataArray = await AsyncStorage.getItem(
        "dreamFormDataArray"
      );
      if (dreamFormDataArray) {
        const formDataArray = JSON.parse(dreamFormDataArray);
        setDreams(formDataArray);
        setFilteredDreams(formDataArray);
      } else {
        console.error("Aucune donnée de rêve trouvée dans AsyncStorage.");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de rêve depuis AsyncStorage :",
        error
      );
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = dreams.filter((dream) =>
      dream.dreamTitle.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDreams(filtered);
  };

  const handleDreamSubmission = async (dreamTitle, dreamText) => {
    try {
      const newDream = { dreamTitle, dreamText };
      const updatedDreams = [...dreams, newDream];
      await AsyncStorage.setItem(
        "dreamFormDataArray",
        JSON.stringify(updatedDreams)
      );
      setDreams(updatedDreams);
      setFilteredDreams(updatedDreams);
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement du rêve dans AsyncStorage :",
        error
      );
    }
  };

  const handleDreamSelection = (index) => {
    console.log("Index du rêve sélectionné :", index);
    const selectedDream = dreams[index];
    handleApiRequest(selectedDream.dreamText);
  };

  const handleApiRequest = async (dreamText) => {
    try {
      const apiUrl = "https://api.meaningcloud.com/topics-2.0";
      const language = "fr";
      const apiKey = "bcd1ea9fc7ab51e2bc69736e28d91941";
      const formdata = new FormData();
      formdata.append("key", apiKey);
      formdata.append("txt", dreamText);
      formdata.append("lang", language);
      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      console.log("dream text : " + dreamText);
      const response = await fetch(apiUrl, requestOptions);
      const responseData = await response.json();
      setApiResponse(responseData);
      console.log("Réponse de l'API MeaningCloud :", responseData);
    } catch (error) {
      console.error("Erreur lors de la requête à l'API MeaningCloud :", error);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleDreamSelection(index)}>
      <Text style={styles.item}>{item.dreamTitle}</Text>
    </TouchableOpacity>
  );

  const renderTable = () => {
    if (!apiResponse) {
      return null;
    }
    const conceptsList = apiResponse.concept_list;
    const entitiesList = apiResponse.entity_list;
    const entryList = [...conceptsList, ...entitiesList];
    return (
      <ScrollView style={styles.scrollView}>
        <Text style={{ marginBottom: 10 }}>Analyse du rêve :</Text>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text style={styles.tableHeader}>Type d'Entrée</Text>
          <Text style={styles.tableHeader}>Pertinence</Text>
          <Text style={styles.tableHeader}>Terme</Text>
          <Text style={styles.tableHeader}>Type Sémantique</Text>
        </View>
        {entryList.map((entry, index) => (
          <View key={index} style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={styles.tableCell}>{entry.type}</Text>
            <Text style={styles.tableCell}>{entry.relevance}</Text>
            <Text style={styles.tableCell}>{entry.form}</Text>
            <Text style={styles.tableCell}>{entry.sementity?.type}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un rêve..."
        onChangeText={handleSearch}
        value={searchText}
      />
      <FlatList
        data={filteredDreams}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      {/* <Button
        title="Effectuer la requête à MeaningCloud"
        onPress={() => handleDreamSubmission("Nouveau rêve", "Contenu du nouveau rêve")}
      /> */}
      {apiResponse && <View style={{ marginTop: 40 }}>{renderTable()}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  item: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    marginRight: 5,
  },
  tableCell: {
    flex: 1,
    marginRight: 5,
  },
  scrollView: {
    maxHeight: 200,
  },
});
