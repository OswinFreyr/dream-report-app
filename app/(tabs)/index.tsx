import { StyleSheet, PermissionsAndroid } from "react-native";
// import { useEffect } from 'react';

import { Text, View } from "@/components/Themed";
import DreamForm from "@/components/DreamForm";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rêvélations : Le Journal Onirique</Text>
      <Text style={styles.title}>Enregistrer son rêve</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <DreamForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#312164",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
