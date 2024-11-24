import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

const museus = [
   {
      id: '1',
      name: 'Masp',
      description:
         'O Museu de Arte de São Paulo Assis Chateaubriand é um dos museus mais importantes do Brasil.',
      image: require('../../assets/masp.jpg'),
   },
   {
      id: '2',
      name: 'Museu Ipiranga',
      description:
         'O Museu do Ipiranga, oficialmente chamado de Museu Paulista, é um marco histórico.',
      image: require('../../assets/ipiranga.jpeg'),
   },
];

const Museu = () => {
   const route = useRoute();
   const { id } = route.params;

   // Encontra o museu correspondente pelo ID
   const museu = museus.find((m) => m.id === id);

   // Verifica se o ID é válido
   if (!museu) {
      return (
         <View style={styles.container}>
            <Text style={styles.errorText}>Museu não encontrado!</Text>
         </View>
      );
   }

   return (
      <View style={styles.container}>
         <Image source={museu.image} style={styles.image} />
         <Text style={styles.title}>{museu.name}</Text>
         <Text style={styles.description}>{museu.description}</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#fff',
   },
   image: {
      width: '100%',
      height: 200,
      borderRadius: 10,
      marginBottom: 20,
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
   },
   description: {
      fontSize: 16,
      textAlign: 'center',
   },
   errorText: {
      fontSize: 18,
      color: 'red',
   },
});

export default Museu;
