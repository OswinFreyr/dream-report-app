import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Divider } from "react-native-paper";
import HistoryCard from "./HistoryCard";

export default function DreamList() {
  const [dreams, setDreams] = useState([]);
  const [filteredDreams, setFilteredDreams] = useState([]);
  const [searchText, setSearchText] = useState("");

  const isFocused = useIsFocused();
  
  useEffect(() => {
    const fetchDreamsFromStorage = async () => {
      try {
        const dreamFormDataArray = await AsyncStorage.getItem("dreamFormDataArray");
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
    AsyncStorage.clear();
    fetchDreamsFromStorage()
  }, [])

  useEffect(() => {
    const fetchDreamsFromStorage = async () => {
      try {
        const dreamFormDataArray = await AsyncStorage.getItem("dreamFormDataArray");
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

  const renderItem = ({ item, index }) => (
    <View>
          <HistoryCard key={index} dream={item} />
          <Divider style={styles.separator}/>
        </View>
  );


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
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
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
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
