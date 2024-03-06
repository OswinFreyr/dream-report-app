import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import AstuceCard from '@/components/AstuceCard';

export default async function TabAstuces() {
    const astucesResponse = await fetch("../datas/Astuces.json")
    const astucesDatas = await astucesResponse.json()
    let rand = Math.random() * (await astucesDatas).length
    const [title, content] = (await astucesDatas)[rand]
    let card = {
        title: {title},
        content: {content}
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Astuce du jour</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <AstuceCard card={card} />
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