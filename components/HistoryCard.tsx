import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

const HistoryCard = ({ dream }) => (
    <Card>
    <Card.Content>
      <Text style={styles.title} >{dream.dreamTitle} -  {dream.date}</Text>
      <Text style={styles.content} >{dream.dreamText} - {dream.isLucidDream ? "Lucide" : "Non Lucide"}</Text>
      <Text style={styles.infos} >{dream.tabInfos.map((info, index) => (
        <Text key={index}>{info.content} - </Text>
      ))}</Text>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: '500',
    },
    content: {
        fontSize: 16,
        marginBottom: 4,
    },
    infos: {
        fontSize: 14,
    },
    Card: {
        width: '80%',
    }
})

export default HistoryCard;