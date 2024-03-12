import * as React from 'react';
import { Pressable } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="lightbulb-on" variant="rounded"/>


const AstuceCard =  ({astuce}) => (
  <Card>
    <Card.Title title={astuce.title} left={LeftContent} />
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Content>
      <Text variant="bodyMedium">{astuce.content}</Text>
    </Card.Content>
    <Card.Actions>
      <Pressable>Voir plus</Pressable>
    </Card.Actions>
  </Card>
);

export default AstuceCard;