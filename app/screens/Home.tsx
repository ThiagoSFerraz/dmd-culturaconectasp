import React, { useEffect, useState } from 'react';
import {
   View,
   Text,
   Button,
   StyleSheet,
   Image,
   FlatList,
   TouchableOpacity,
   Dimensions,
   ScrollView,
   ImageBackground,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const eventos = [
   {
      id: '1',
      title: 'Exposição da Monalisa',
      image: require('./../../assets/evento.png'),
   },
   {
      id: '2',
      title: 'Exposição da Monalisa',
      image: require('./../../assets/evento.png'),
   },
];

const museus = [
   {
      id: '1',
      name: 'Masp',
      image: require('../../assets/masp.jpg'),
      route: 'Masp',
   },
   {
      id: '2',
      name: 'Pinacoteca',
      image: require('../../assets/pinacoteca.jpg'),
      route: 'Pinacoteca',
   },
];

interface RouterProps {
   navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: RouterProps) => {
   const [userName, setUserName] = useState<string>('Usuário');
   const [profilePicture, setProfilePicture] = useState<string>(
      'https://via.placeholder.com/150.png?text=Foto+de+Perfil'
   );

   useEffect(() => {
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
         const profileRef = doc(FIREBASE_DB, 'profiles', user.uid);
         getDoc(profileRef).then((doc) => {
            if (doc.exists()) {
               const data = doc.data();
               setUserName(data?.nickname || 'Usuário');
               setProfilePicture(
                  data?.profilePicture ||
                     'https://via.placeholder.com/150.png?text=Foto+de+Perfil'
               );
            }
         });
      }
   }, []);

   return (
      <SafeAreaView style={[styles.background]}>
         <Image
            source={require('../../assets/adorno_lateral_cima.png')}
            style={[styles.backgroundImage, styles.topLeft]}
         />
         <Image
            source={require('../../assets/adorno_lateral_baixo.png')}
            style={[styles.backgroundImage, styles.bottomRight]}
         />
         <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Header */}
            <View style={styles.header}>
               <Text style={styles.greeting}>Olá, {userName}!</Text>
               <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                  <Image source={{ uri: profilePicture }} style={styles.profileImage} />
               </TouchableOpacity>
            </View>

            {/* Eventos */}
            <View style={styles.containerEventos}>
               <Text style={styles.sectionTitle}>Principais Eventos</Text>
               <FlatList
                  data={eventos}
                  style={[styles.EventBotLine]}
                  indicatorStyle="white"
                  horizontal
                  showsHorizontalScrollIndicator={true}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                     <View style={styles.carouselItemEvent}>
                        <Image source={item.image} style={styles.carouselImageEvent} />
                     </View>
                  )}
               />
               <TouchableOpacity
                  style={styles.customButton}
                  onPress={() => navigation.navigate('PostScreen')}
               >
                  <Text style={styles.buttonText}>Ver posts sobre</Text>
               </TouchableOpacity>
            </View>

            {/* Museus */}
            <View style={styles.containerMuseus}>
               <Text style={styles.sectionTitle}>Museus</Text>
               <FlatList
                  data={museus}
                  horizontal
                  style={{ padding: 0 }}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                     <TouchableOpacity
                        onPress={() => navigation.navigate(item.route)} // Agora navega para a rota específica
                        style={styles.carouselItem}
                     >
                        <Image source={item.image} style={styles.carouselImage} />
                        <Text style={styles.carouselText}>{item.name}</Text>
                     </TouchableOpacity>
                  )}
               />
            </View>

            {/* Botões de Navegação */}
            {/* <View style={styles.buttons}>
               <Button
                  onPress={() =>
                     navigation.navigate('QuizScreen', { quizId: 'monalisa' })
                  }
                  title="Iniciar Quiz Monalisa"
               />
               <Button onPress={() => FIREBASE_AUTH.signOut()} title="Sair" />
            </View> */}
         </ScrollView>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   background: {
      backgroundColor: '#002b53',
      flex: 1,
   },
   backgroundImage: {
      position: 'absolute',
      resizeMode: 'cover', // Ajusta a imagem para não distorcer
   },
   topLeft: {
      top: 0,
      left: 0,
   },
   bottomRight: {
      bottom: -40,
      right: 0,
   },
   scrollContainer: {
      paddingTop: 20,
      paddingBottom: 20, // Adicionando paddingBottom para garantir que o conteúdo esteja visível até o fim
      flexGrow: 1, // Garante que o ScrollView possa ocupar todo o espaço vertical disponível
   },
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      padding: 20,
   },
   greeting: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
   },
   profileImage: {
      width: 75,
      height: 75,
      borderRadius: 45,
      borderColor: '#fff',
      borderWidth: 2,
   },
   sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      marginVertical: 10,
   },
   carouselItem: {
      width: width * 0.5,
      marginRight: 10,
   },
   carouselImage: {
      width: '100%',
      height: 250,
      borderRadius: 50,
   },
   carouselItemEvent: {
      width: width * 1,
      marginRight: 0,
   },
   carouselImageEvent: {
      width: '100%',
      height: 200,
      borderRadius: 0,
   },
   EventBotLine: {
      borderBottomWidth: 10,
      borderBottomColor: '#E9820A',
   },
   carouselText: {
      textAlign: 'center',
      marginTop: 5,
      color: '#fff',
   },
   buttons: {
      paddingTop: 100, // Dê algum espaço entre os elementos anteriores e os botões
      paddingHorizontal: 20,
   },
   containerEventos: { padding: 20 },
   containerMuseus: { paddingTop: 0, paddingBottom: 20, paddingLeft: 20 },
   customButton: {
      backgroundColor: '#E9820A', // Cor de fundo

      paddingVertical: 15, // Altura do botão
      paddingHorizontal: 30, // Largura do botão
      borderRadius: 25, // Bordas arredondadas
      alignItems: 'center', // Centraliza o texto
      marginTop: 30, // Espaçamento vertical
      elevation: 3, // Sombra (em dispositivos Android)
      shadowColor: '#000', // Cor da sombra (iOS)
      shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra (iOS)
      shadowOpacity: 0.8, // Opacidade da sombra (iOS)
      shadowRadius: 2, // Raio da sombra (iOS)
   },
   buttonText: {
      color: '#fff', // Cor do texto
      fontSize: 16, // Tamanho da fonte
      fontWeight: 'bold', // Peso da fonte
   },
});

export default Home;
