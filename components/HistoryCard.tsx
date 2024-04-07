import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

const HistoryCard = ({ dream }) => (
    <Card>
    <Card.Content>
      <Text style={styles.title} >{dream.dreamTitle} -  {dream.date}</Text>
      <Text style={styles.content} >{dream.dreamText} </Text>
      <Text style={styles.lucid} >{dream.isLucidDream ? "Lucide" : "Non Lucide"}</Text>
      <Text style={styles.infos} >{dream.tabInfosPeople.map((info, index) => (
        <Text key={index}>{info.content} - </Text>
      ))}</Text>
      <Text style={styles.infos} >{dream.tabInfosThemes.map((info, index) => (
        <Text key={index}>{info.content} - </Text>
      ))}</Text>
      <Text style={styles.infos} >{dream.tabInfosFeelings.map((info, index) => (
        <Text key={index}>{info.content} - </Text>
      ))}</Text>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: '500',
        paddingBottom: 3,
    },
    content: {
        fontSize: 16,
        marginBottom: 4,
    },
    lucid: {
      fontSize: 15,
      marginBottom: 5,
      textDecorationLine: 'underline',
    },
    infos: {
        fontSize: 14,
    },
    Card: {
        width: '80%',
    }
})

export default HistoryCard;