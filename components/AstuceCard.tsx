import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="lightbulb-on" variant="rounded"/>


const AstuceCard = ({card}) => (
  <Card>
    <Card.Title title={card["title"]} left={LeftContent} />
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Content>
      <Text variant="bodyMedium">{card["content"]}</Text>
    </Card.Content>
    <Card.Actions>
      <Button>Voir plus</Button>
    </Card.Actions>
  </Card>
);

export default AstuceCard;