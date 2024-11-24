import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const HoracioLafer = () => {
   return (
      <ScrollView style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.title}>Galeria Horácio Lafer</Text>
         </View>
         <View style={styles.content}>
            <Text style={styles.description}>
               Nessa galeria, localizada no 1º andar do prédio, você encontrará obras de
               Pierre-Auguste Renoir, Vincent van Gogh, Candido Portinari, com a famosa
               pintura de “O Lavrador”, Van Gogh, com o quadro “O Escolar”, entre outros
               artistas. A localização certa das obras não é divulgada por questões de
               segurança. Então, você precisa percorrer as galerias para encontrar as
               peças.
            </Text>
         </View>
         <View>
            <Text style={styles.title}>OBRAS:</Text>
         </View>
         <View style={styles.attraction}>
            <Text style={styles.attractionText}>
               <Text style={{ color: '#f28500' }}>Candido Portinari</Text>, O Lavrador de
               café
            </Text>
            <Image
               source={require('../../assets/lavradordecafe.png')}
               style={styles.attractionImageRight}
            />
         </View>
         <View style={styles.attraction}>
            <Image
               source={require('../../assets/suzanebloch.png')}
               style={styles.attractionImageLeft}
            />
            <Text style={styles.attractionTextRight}>
               <Text style={{ color: '#f28500' }}>Pablo Picasso</Text>, Retrato de Suzanne
               Bloch
            </Text>
         </View>
         <View style={styles.attraction}>
            <Text style={styles.attractionText}>
               <Text style={{ color: '#f28500' }}>Vincent Van Gogh</Text>, O escolar
            </Text>
            <Image
               source={require('../../assets/escolar.png')}
               style={styles.attractionImageRight}
            />
         </View>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#002b53',
   },
   header: {
      alignItems: 'center',
      marginVertical: 20,
   },
   image: {
      width: 300,
      height: 200,
      borderRadius: 20,
   },
   title: {
      fontSize: 24,
      color: '#f28500',
      fontWeight: 'bold',
      marginTop: 50,
      textAlign: 'center',
      marginBottom: 50,
   },
   content: {
      padding: 20,
   },
   description: {
      fontSize: 20,
      color: '#fff',
      lineHeight: 24,
      marginBottom: 10,
      textAlign: 'center',
   },
   attraction: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      paddingVertical: 20,
   },
   attractionImageRight: {
      width: 160,
      height: 300,
      borderBottomLeftRadius: 50,
      borderTopLeftRadius: 50,
   },
   attractionImageLeft: {
      width: 180,
      height: 300,
      borderBottomRightRadius: 50,
      borderTopRightRadius: 50,
   },
   attractionText: {
      fontSize: 30,
      width: 180,
      marginLeft: 20,
      color: '#fff',
      fontWeight: '600',
   },
   attractionTextRight: {
      fontSize: 30,
      width: 150,
      marginLeft: 20,
      color: '#fff',
      fontWeight: '600',
   },
});

export default HoracioLafer;
