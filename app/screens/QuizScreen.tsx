import React, { useEffect, useState } from 'react';
import {
   View,
   Text,
   FlatList,
   TouchableOpacity,
   StyleSheet,
   ActivityIndicator,
   Alert,
} from 'react-native';
import { FIREBASE_DB } from '../../firebaseConfig'; // Importando o Firestore configurado
import { doc, getDoc } from 'firebase/firestore';

interface QuizScreenProps {
   route: any;
   navigation: any;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ route, navigation }) => {
   const { quizId } = route.params || {};

   const [quizData, setQuizData] = useState<any>(null);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [userAnswers, setUserAnswers] = useState<number[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (!quizId) {
         Alert.alert('Erro', 'ID do quiz não fornecido.');
         navigation.goBack();
         return;
      }

      const fetchQuizData = async () => {
         try {
            const quizRef = doc(FIREBASE_DB, 'quizzes', quizId); // Referência ao documento no Firestore
            const quizSnapshot = await getDoc(quizRef);

            if (quizSnapshot.exists()) {
               setQuizData(quizSnapshot.data());
            } else {
               Alert.alert('Erro', 'Quiz não encontrado.');
               navigation.goBack();
            }
         } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar o quiz.');
            console.error(error);
         } finally {
            setLoading(false);
         }
      };

      fetchQuizData();
   }, [quizId]);

   const handleAnswer = (selectedOption: number) => {
      const question = quizData.questions[currentQuestionIndex];
      const isCorrect = selectedOption === question.correctOption;

      setUserAnswers([...userAnswers, selectedOption]);

      if (currentQuestionIndex === quizData.questions.length - 1) {
         // Última pergunta, navega para o feedback
         navigation.navigate('QuizFeedbackScreen', {
            quizData,
            userAnswers: [...userAnswers, selectedOption],
         });
      } else {
         setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
   };

   if (loading) {
      return (
         <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
         </View>
      );
   }

   if (!quizData) {
      return (
         <View style={styles.container}>
            <Text>Erro: Dados do quiz não encontrados.</Text>
         </View>
      );
   }

   const question = quizData.questions[currentQuestionIndex];

   return (
      <View style={styles.container}>
         <Text style={styles.questionText}>{question.text}</Text>
         <FlatList
            data={question.options}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
               <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => handleAnswer(index)}
               >
                  <Text style={styles.optionText}>{item}</Text>
               </TouchableOpacity>
            )}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: { flex: 1, padding: 20, justifyContent: 'center' },
   loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
   questionText: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
   optionButton: {
      padding: 15,
      backgroundColor: '#E9820A',
      borderRadius: 8,
      marginBottom: 10,
   },
   optionText: { fontSize: 16, textAlign: 'center' },
});

export default QuizScreen;
