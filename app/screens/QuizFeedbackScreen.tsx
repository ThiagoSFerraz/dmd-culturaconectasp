import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

interface QuizFeedbackScreenProps {
   route: any;
   navigation: any;
}

const QuizFeedbackScreen: React.FC<QuizFeedbackScreenProps> = ({ route, navigation }) => {
   const { quizData, userAnswers } = route.params || {};

   if (!quizData || !userAnswers) {
      return (
         <View style={styles.container}>
            <Text>Erro: Dados do feedback não encontrados.</Text>
         </View>
      );
   }

   return (
      <View style={styles.container}>
         <FlatList
            data={quizData.questions}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => {
               const userAnswer = userAnswers[index];
               const isCorrect = userAnswer === item.correctOption;
               return (
                  <View
                     style={[
                        styles.feedbackItem,
                        isCorrect ? styles.correct : styles.incorrect,
                     ]}
                  >
                     <Text style={styles.questionText}>{item.text}</Text>
                     <Text style={styles.answerText}>
                        Sua resposta: {item.options[userAnswer] || 'Não respondida'}
                     </Text>
                     {!isCorrect && (
                        <Text style={styles.correctAnswerText}>
                           Resposta correta: {item.options[item.correctOption]}
                        </Text>
                     )}
                  </View>
               );
            }}
         />
         <TouchableOpacity
            style={styles.customButton}
            onPress={() => navigation.navigate('Home')}
            title="Voltar para o inicio"
         >
            <Text style={{ color: '#fff' }}>Voltar para o inicio</Text>
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   container: { flex: 1, padding: 20, justifyContent: 'center' },
   title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
   feedbackItem: { marginBottom: 20, padding: 15, borderRadius: 8 },
   correct: { backgroundColor: '#d4edda' },
   incorrect: { backgroundColor: '#f8d7da' },
   questionText: { fontSize: 18, fontWeight: 'bold' },
   answerText: { fontSize: 16 },
   correctAnswerText: { fontSize: 16, fontWeight: 'bold' },
   customButton: {
      backgroundColor: '#E9820A', // Cor de fundo

      paddingVertical: 15, // Altura do botão
      paddingHorizontal: 50, // Largura do botão
      borderRadius: 25, // Bordas arredondadas
      alignItems: 'center', // Centraliza o texto
      marginTop: 30, // Espaçamento vertical
   },
});

export default QuizFeedbackScreen;
