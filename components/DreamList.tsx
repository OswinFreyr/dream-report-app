import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Divider } from "react-native-paper";
import HistoryCard from "./HistoryCard";

export default function DreamList() {
  const [dreams, setDreams] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem("dreamFormDataArray");
        const dreamFormDataArray = data ? JSON.parse(data) : [];
        setDreams(dreamFormDataArray);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    AsyncStorage.clear();
    fetchData();
  }, []);
  // Ce useEffect est executé à chaque fois que 'dreams' change
  useEffect(() => {
    const updateComponent = async () => {
      try {
        const data = await AsyncStorage.getItem("dreamFormDataArray");
        const dreamFormDataArray = data ? JSON.parse(data) : [];
        setDreams(dreamFormDataArray);
      } catch (error) {
        console.error("Erreur lors de la mise à jour des données:", error);
      }
    };
    updateComponent();
  }, [dreams]);
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
    <View>
      {dreams.map((dream, index) => (
        <View>
          <HistoryCard key={index} dream={dream} />
          <Divider style={styles.separator}/>
        </View>
      ))}
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
});
