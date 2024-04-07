import React from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform, } from 'react-native';

import { Text, View } from './Themed';

export default function AppInfo({ path }: { path: string }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.infosText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Bienvenue sur Rêvélations ! Ici, vous pouvez recenser et analyser vos rêves en toute simplicité !
        </Text>

        <Text
          style={styles.titleText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Sauvegarder un rêve
        </Text>
        <Text
          style={styles.infosText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Pour enregistrer un de vos songes, retournez sur la page d'accueil et remplissez le formulaire.
          Choisissez parmi les différentes options pour retranscrire au mieux votre rêve et ainsi en affiner l'analyse.
        </Text>

        <Text
          style={styles.titleText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Quelques astuces : 
        </Text>
        <Text
          style={styles.infosText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Si vous êtes à la recherche d'astuces sur vos rêves ou votre sommeil, rendez-vous dans l'onglet Astuces.
        </Text>

        <Text
          style={styles.titleText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Retrouver son rêve : 
        </Text>
        <Text
          style={styles.infosText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Retrouvez tous vos rêves dans l'onglet Historique. Ne vous inquiétez pas, vous pouvez retrouver votre rêve favori via son titre.
        </Text>

        <Text
          style={styles.titleText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Décortiquer son rêve
        </Text>
        <Text
          style={styles.infosText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Besoin de mieux comprendre son rêve ? Analysez vos rêves dans l'onglet Analyse et voyez les différentes informations qui en ressortent. Recherchez les par leur titre pour en trouvez des spécifiques.
        </Text>

        <Text
          style={styles.titleText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Ajout d'informations : 
        </Text>
        <Text
          style={styles.infosText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Ajoutez des personnes, thèmes et émotions grâce à l'onglet Paramètres.
        </Text>

        <Text
          style={styles.titleText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Pourquoi Rêvélations vous est utile : 
        </Text>
        <Text
          style={styles.infosText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          N'oubliez pas, il est important d'être assidu pour obtenir la meilleure expérience possible ! 
          En effet, dans l'intimité du sommeil, nos esprits s'évadent dans des mondes oniriques, riches en symboles et en émotions. Pour capturer ces fragments de notre être intérieur, le journal de rêves devient un allié précieux. Chaque nuit, il nous guide à travers les dédales de l'inconscient, révélant des motifs récurrents, des désirs enfouis et des énigmes à résoudre. 
        </Text>
        <Text
          style={styles.infosTextB}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Au réveil, ces pages deviennent des miroirs de notre âme, nourrissant notre créativité et notre exploration de soi. En somme, le journal de rêves est bien plus qu'un simple recueil de souvenirs nocturnes ; il est le portail vers notre monde intérieur, un compagnon de voyage au cœur de l'inconnu. 
        </Text>
      </View>

    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  infosText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'justify',
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  infosTextB: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'justify',
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: -5,
  },
  titleText: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'left',
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 3,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',

  },
});
