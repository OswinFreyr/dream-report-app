import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export default function DreamAnalysis() {
  const [apiResponse, setApiResponse] = useState(null);
  const [dreams, setDreams] = useState([]);
  const [filteredDreams, setFilteredDreams] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showAllDreams, setShowAllDreams] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
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
          console.error("No dream data found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error fetching dream data from AsyncStorage:", error);
      }
    };

    if (isFocused) {
      fetchDreamsFromStorage();
    }
  }, [isFocused]);

  useEffect(() => {
    setFilteredDreams(
      dreams.filter((dream) =>
        dream.dreamTitle.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [dreams, searchText]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleDreamSelection = (index) => {
    const selectedDream = filteredDreams[index];
    handleApiRequest(selectedDream.dreamText);
  };

  const handleApiRequest = async (dreamText) => {
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const language = "fr";
      const apiKey = process.env.EXPO_PUBLIC_API_KEY;
      const formdata = new FormData();
      formdata.append("key", apiKey);
      formdata.append("txt", dreamText);
      formdata.append("lang", language);
      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      const response = await fetch(apiUrl, requestOptions);
      const responseData = await response.json();
      setApiResponse(responseData);
    } catch (error) {
      console.error("Error making request to MeaningCloud API:", error);
    }
  };

  const renderItem = ({ item, index }) => {
    if (!showAllDreams && index >= 4) return null;
    const descIndex = filteredDreams.length - index - 1;
    const dream = filteredDreams[descIndex];
    return (
      <TouchableOpacity onPress={() => handleDreamSelection(descIndex)}>
        <Text style={styles.item}>{dream.dreamTitle}</Text>
      </TouchableOpacity>
    );
  };

  const renderTable = () => {
    if (!apiResponse) {
      return null;
    }
    const conceptsList = apiResponse.concept_list;
    const entitiesList = apiResponse.entity_list;
    const entryList = [...conceptsList, ...entitiesList];
    return (
      <View style={styles.scrollView}>
        <Text style={styles.analysisHeader}>Analyse de votre rêve :</Text>
        <View style={styles.tableHeaderContainer}>
          <Text style={styles.tableHeader}>Type</Text>
          <Text style={styles.tableHeader}>Pertinence</Text>
          <Text style={styles.tableHeader}>Terme</Text>
          <Text style={styles.tableHeader}>Type sémantique</Text>
        </View>
        {entryList.map((entry, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{entry.type}</Text>
            <Text style={styles.tableCell}>{entry.relevance}</Text>
            <Text style={styles.tableCell}>{entry.form}</Text>
            <Text style={styles.tableCell}>{entry.sementity?.type}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un rêve"
        onChangeText={handleSearch}
        value={searchText}
      />
      <FlatList
        data={filteredDreams}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      {!showAllDreams && filteredDreams.length > 4 && (
        <TouchableOpacity onPress={() => setShowAllDreams(true)}>
          <Text style={styles.showMoreButton}>Voir plus</Text>
        </TouchableOpacity>
      )}
      {apiResponse && <View style={{ marginTop: 40 }}>{renderTable()}</View>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "grey",
  },
  item: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  scrollView: {
    maxHeight: 200,
  },
  analysisHeader: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  tableHeaderContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    marginRight: 5,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  tableCell: {
    flex: 1,
    marginRight: 5,
    textAlign: "center",
  },
  showMoreButton: {
    marginTop: 10,
    textAlign: "center",
    color: "blue",
    textDecorationLine: "underline",
  },
});
