import { StyleSheet, PermissionsAndroid } from 'react-native';
// import { useEffect } from 'react';

import { Text, View } from '@/components/Themed';
import  DreamForm  from '@/components/DreamForm';

export default function TabOneScreen() {
  const getPermissions = async () => {
    let permissions = [
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]    
    
    let status = await PermissionsAndroid.requestMultiple(permissions)
    
    if (status = PermissionsAndroid.RESULTS.GRANTED){
        // granted
        console.log("coucou");
        
    }else{
       // Not granted
       console.log("pas coucou");
       
    }
  }
  getPermissions()


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <DreamForm/>
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
