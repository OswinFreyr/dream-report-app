import * as React from 'react';
import { Pressable, KeyboardAvoidingView, ScrollView, Platform, } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="lightbulb-on" variant="rounded"/>


const AstuceCard =  ({astuce}) => (
  <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
  <Card>
    <Card.Title title={astuce.title} left={LeftContent} />
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Content>
      <Text variant="bodyMedium">{astuce.content}</Text>
    </Card.Content>
    <Card.Actions>
      <Pressable>
        <Text>Voir plus</Text>
      </Pressable>
    </Card.Actions>
  </Card>
  </ScrollView>
  </KeyboardAvoidingView>
);

export default AstuceCard;