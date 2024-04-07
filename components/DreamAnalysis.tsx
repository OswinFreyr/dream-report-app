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

    if(isFocused){
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
        <Text style={{ marginBottom: 10 }}>Analyse de votre rêve :</Text>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text style={styles.tableHeader}>Entry Type</Text>
          <Text style={styles.tableHeader}>Relevance</Text>
          <Text style={styles.tableHeader}>Term</Text>
          <Text style={styles.tableHeader}>Semantic Type</Text>
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
        placeholder="Rechercher un rêve "
        onChangeText={handleSearch}
        value={searchText}
      />
      <FlatList
        data={filteredDreams}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
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
    color : "grey"
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
