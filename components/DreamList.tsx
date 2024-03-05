import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DreamList() {
    const [dreams, setDreams] = useState([]);
    // Ce useEffect est executé une seule fois à l'instanciation du composant
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await AsyncStorage.getItem('dreamFormDataArray');
                const dreamFormDataArray = data ? JSON.parse(data) : [];
                setDreams(dreamFormDataArray);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        AsyncStorage.clear();
        fetchData();
    }, []);

    // Ce useEffect est executé à chaque fois que 'dreams' change
    useEffect(() => {
        const updateComponent = async () => {
            try {
                const data = await AsyncStorage.getItem('dreamFormDataArray');
                const dreamFormDataArray = data ? JSON.parse(data) : [];
                setDreams(dreamFormDataArray);
            } catch (error) {
                console.error('Erreur lors de la mise à jour des données:', error);
            }
        };
        updateComponent();
    }, [dreams]);

    return (
        <View>
            <Text style={styles.title}>Liste des Rêves :</Text>
            {dreams.map((dream, index) => (
                <Text key={index} style={styles.dreamText}>
                    {/* {dream.dreamText} - {dream.isLucidDream ? 'Lucide' : 'Non Lucide'} */}
                </Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    dreamText: {
        fontSize: 16,
        marginBottom: 4,
    },
});