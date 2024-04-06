import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/AppInfo";
import { Text, View } from "@/components/Themed";
import DreamList from "@/components/DreamList";
import DreamAnalysis from "@/components/DreamAnalysis";

export default function TabTests() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analysez vos rêves </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <DreamAnalysis />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
