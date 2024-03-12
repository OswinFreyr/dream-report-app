import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import AstuceCard from '@/components/AstuceCard';
import { useState } from 'react';

export default function TabAstuces() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const getAstucesData = async () => {

        const astucesResponse = await fetch("../datas/Astuces.json");

        const astucesDatas = await astucesResponse.json();

        let rand = Math.random() * (await astucesDatas.astuces).length;

        rand = Math.trunc(rand);

        setTitle(astucesDatas.astuces[rand].title);
        setContent(astucesDatas.astuces[rand].content);
    }
    

    getAstucesData();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Astuce du jour</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <AstuceCard astuce={{title: title, content: content}} />
        </View>
    );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
title: {
    fontSize: 20,
    fontWeight: 'bold',
},
separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
},
});