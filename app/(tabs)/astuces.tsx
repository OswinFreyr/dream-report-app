import { StyleSheet, } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Text, View } from '@/components/Themed';
import AstuceCard from '@/components/AstuceCard';
import { useState, useEffect } from 'react';
import { Astuces } from "@/datas/Astuces";

export default function TabAstuces() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    let ignore = false
    const isFocused = useIsFocused();
    if(!isFocused){
        ignore = false;
    }

    useEffect(() => {
        const getAstucesData = async () => {    
            let rand = Math.random() * Astuces.length;
            rand = Math.trunc(rand);
    
            setTitle(Astuces[rand].title);
            setContent(Astuces[rand].content);
        }
        if(!ignore) {
            getAstucesData()
        }
        return () => {
                ignore = true;
    }});

    return (
    
        <View style={styles.container}>
            <Text style={styles.title}>Une astuce aléatoire</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <AstuceCard astuce={{title: title, content: content} ?? {title: "Loading title", content: "Loading content"}} />
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
    marginTop: 20,
},
separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
},
});