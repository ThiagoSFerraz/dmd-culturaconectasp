import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { uploadQuizzes } from '../../firebaseConfig';

interface RouterProps {
   navigation: NavigationProp<any, any>;
}

const Pinacoteca = ({ navigation }: RouterProps) => {
   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.title}>Pinacoteca</Text>
            <Image style={styles.image} source={require('../../assets/pinacoteca.jpg')} />
         </View>
         <Text style={styles.description}>
            {' '}
            Faça um Quiz para mostrar o quanto você conhece da Pinacoteca!
         </Text>
         <TouchableOpacity
            style={styles.customButton}
            onPress={() => navigation.navigate('QuizScreen', { quizId: 'pinacoteca' })}
            title="Iniciar Quiz Monalisa"
         >
            <Text style={{ color: '#fff' }}>Quiz</Text>
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 50,
      padding: 20,
      backgroundColor: '#002b53',
   },
   image: {
      width: 300,
      height: 300,
      borderRadius: 50,
      marginBottom: 20,
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      color: '#f28500',
   },
   description: {
      fontSize: 20,
      color: '#fff',
      textAlign: 'center',
   },
   customButton: {
      backgroundColor: '#E9820A', // Cor de fundo

      paddingVertical: 15, // Altura do botão
      paddingHorizontal: 50, // Largura do botão
      borderRadius: 25, // Bordas arredondadas
      alignItems: 'center', // Centraliza o texto
      marginTop: 30, // Espaçamento vertical
   },
});

export default Pinacoteca;
