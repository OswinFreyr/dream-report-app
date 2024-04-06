import * as React from "react";
import {
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

const LeftContent = (props) => (
  <Avatar.Icon {...props} icon="lightbulb-on" variant="rounded" />
);

const AstuceCard = ({ astuce }) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
  >
    <ScrollView keyboardShouldPersistTaps="handled">
      <Card style={styles.card}>
        <Card.Title  title={astuce.title} left={LeftContent} />
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Content>
          <Text style={{ color: "black", marginTop : 15, textAlign: "justify" }} variant="bodyMedium">
            {astuce.content}
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  </KeyboardAvoidingView>
);

export default AstuceCard;

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
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
});
