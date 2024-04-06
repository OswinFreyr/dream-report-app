import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function DreamAnalysis() {
  const [apiResponse, setApiResponse] = useState(null);
  const handleApiRequest = async () => {
    try {
      const apiUrl = "https://api.meaningcloud.com/topics-2.0";
      const language = "fr";
      const tmpDream = "Afida Turner se retrouve soudainement en compétition avec Driss Homet pour décrocher le dernier pot de crème glacée dans un désert mystérieux. Alors qu'ils se précipitent pour l'attraper, le pot semble acquérir des jambes et commence à danser en criant des blagues, les laissant perplexes dans une folie hilarante où la crème glacée devient leur adversaire le plus redoutable.";
      const apiKey = "bcd1ea9fc7ab51e2bc69736e28d91941";
      const formdata = new FormData();
      formdata.append("key", apiKey);
      formdata.append("txt", tmpDream);
      formdata.append("lang", language);
      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      const response = await fetch(apiUrl, requestOptions);
      const responseData = await response.json();
      setApiResponse(responseData);
      console.log("Réponse de l'API MeaningCloud :", responseData);
    } catch (error) {
      console.error("Erreur lors de la requête à l'API MeaningCloud :", error);
    }
  };

  const renderTable = () => {
    if (!apiResponse) {
      return null;
    }
    const conceptsList = apiResponse.concept_list;
    const entitiesList = apiResponse.entity_list;
    const entryList = [...apiResponse.concept_list, ...apiResponse.entity_list];
    return (
      <View>
        <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
          Tableau des données :
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text style={styles.tableHeader}>Type d'Entrée</Text>
          <Text style={styles.tableHeader}>Pertinence</Text>
          <Text style={styles.tableHeader}>Terme</Text>
          <Text style={styles.tableHeader}>Type Sémantique</Text>
        </View>
        {conceptsList.map((entry, index) => (
          <View key={index} style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={styles.tableCell}>Concept</Text>
            <Text style={styles.tableCell}>{entry.relevance}</Text>
            <Text style={styles.tableCell}>{entry.form}</Text>
            <Text style={styles.tableCell}>{entry.sementity.type}</Text>
          </View>
        ))}
        {entitiesList.map((entry, index) => (
          <View key={index} style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={styles.tableCell}>Entity</Text>
            <Text style={styles.tableCell}>{entry.relevance}</Text>
            <Text style={styles.tableCell}>{entry.form}</Text>
            <Text style={styles.tableCell}>{entry.sementity.type}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View>
      <Button
        title="Effectuer la requête à MeaningCloud"
        onPress={handleApiRequest}
      />
      {apiResponse && (
        <View>
          <Text>Réponse de l'API :</Text>
          {renderTable()}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    marginRight: 5,
  },
  tableCell: {
    flex: 1,
    marginRight: 5,
  },
});
