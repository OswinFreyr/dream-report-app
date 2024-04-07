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
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [tabInfosPeople, setTabInfosPeople] = useState([]);
  const [tabInfosThemes, setTabInfosThemes] = useState([]);
  const [tabInfosFeelings, setTabInfosFeelings] = useState([]);

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
          setShowMoreButton(formDataArray.length > 4);
        }
        // else {
        // console.error("Aucun rêve trouvé dans l'Async Storage.");
        // }
      } catch (error) {
        console.error("Erreur fetch:", error);
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
    setShowMoreButton(filteredDreams.length > 4);
  }, [dreams, searchText]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleDreamSelection = (index) => {
    const selectedDream = filteredDreams[index];
    handleApiRequest(selectedDream.dreamText);
    const peopleContent = selectedDream.tabInfosPeople.map(
      (person) => person.content
    );
    const themesContent = selectedDream.tabInfosThemes.map(
      (theme) => theme.content
    );
    const feelingsContent = selectedDream.tabInfosFeelings.map(
      (feeling) => feeling.content
    );
    setTabInfosPeople(peopleContent);
    setTabInfosThemes(themesContent);
    setTabInfosFeelings(feelingsContent);
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
      // console.error("Erreur requête vers MeaningCloud API:", error);
    }
  };

  const handleShowLess = () => {
    setShowAllDreams(false);
    setShowMoreButton(filteredDreams.length > 4);
  };

  const handleShowMore = () => {
    setShowAllDreams(true);
    setShowMoreButton(false);
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
      <View>
        <Text style={styles.analysisHeader}>Analyse de votre rêve :</Text>
        <View style={styles.tableHeaderContainer}>
          <Text style={styles.tableHeader}>Pertinence</Text>
          <Text style={styles.tableHeader}>Terme</Text>
          <Text style={styles.tableHeader}>Type</Text>
        </View>
        {entryList.map((entry, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{entry.relevance}</Text>
            <Text style={styles.tableCell}>{entry.form}</Text>
            <Text style={styles.tableCell}>
              {entry.sementity?.type && entry.sementity.type.split(">")[1]}
            </Text>
          </View>
        ))}
          <Text style={styles.analysisHeader}>
            Analyse des infos supplémentaires :
          </Text>
        <View style={{ display: "flex", flexDirection: "row" , justifyContent: "center"}}>
          <View style={{ display: "flex", flexDirection: "column" }}>
            <View style={styles.tableHeaderContainer}>
              <Text style={styles.tableHeader}>Personnes</Text>
            </View>
            {tabInfosPeople.map((person, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{person}</Text>
              </View>
            ))}
          </View>

          <View style={{ display: "flex", flexDirection: "column" }}>
            <View style={styles.tableHeaderContainer}>
              <Text style={styles.tableHeader}>Thèmes</Text>
            </View>
            {tabInfosThemes.map((theme, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{theme}</Text>
              </View>
            ))}
          </View>

          <View style={{ display: "flex", flexDirection: "column" }}>
            <View style={styles.tableHeaderContainer}>
              <Text style={styles.tableHeader}>Émotions</Text>
            </View>
            {tabInfosFeelings.map((feeling, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{feeling}</Text>
              </View>
            ))}
          </View>
        </View>
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
      {showMoreButton && !showAllDreams && filteredDreams.length > 4 && (
        <TouchableOpacity onPress={handleShowMore}>
          <Text style={styles.showMoreButton}>Afficher plus</Text>
        </TouchableOpacity>
      )}
      {showAllDreams && (
        <TouchableOpacity onPress={handleShowLess}>
          <Text style={styles.showMoreButton}>Afficher moins</Text>
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
    borderBottomWidth: 1,
    borderColor: "#ab9ccf",
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "grey",
  },
  item: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ab9ccf",
  },
  scrollView: {
    maxHeight: 200,
  },
  analysisHeader: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20
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
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  showMoreButton: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: "#d0bcff",
    borderRadius: 20,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
  },
});
