import React, { useRef } from 'react';
import {
   View,
   Text,
   Image,
   StyleSheet,
   ScrollView,
   TouchableOpacity,
} from 'react-native';

const Masp = ({ navigation }) => {
   const scrollViewRef = useRef(null);

   // Dados específicos do MASP
   const data = {
      image: require('../../assets/masp.jpg'),
      attractions: [
         { name: 'Fachada', image: require('../../assets/masp.jpg') },
         { name: 'Galeria Horácio Lafer', image: require('../../assets/horacio.png') },
         {
            name: 'Galeria Georges Wildenstein',
            image: require('../../assets/georges.jpg'),
         },
         { name: 'Outros', image: require('../../assets/outros.jpg') },
      ],
      history:
         'O Museu de Arte de São Paulo Assis Chateaubriand (MASP), fundado em 1947 por Assis Chateaubriand, é o primeiro museu moderno do Brasil e possui uma coleção de mais de 11 mil obras de arte de diversas culturas e períodos.\n\nInicialmente localizado no centro de São Paulo, em 1968, o museu foi transferido para a avenida Paulista, em um edifício icônico projetado por Lina Bo Bardi.\n\nA arquitetura inovadora do prédio, com o "vão livre" e os cavaletes de cristal, desafia o modelo tradicional de museu, proporcionando uma experiência mais interativa e flexível para os visitantes.',
   };

   return (
      <ScrollView
         ref={scrollViewRef}
         style={styles.container}
         contentContainerStyle={styles.content}
      >
         {/* Seção inicial */}
         <View style={styles.header}>
            <Text style={styles.title}>
               <Text style={styles.title2}>Masp:</Text> Museu de arte de São Paulo
            </Text>
            <Image source={data.image} style={styles.headerImage} />
            <Text style={styles.welcome}>Seja bem-vindo ao Masp!</Text>
            <Text style={styles.welcome}>Role para baixo para começar a cultura:</Text>
            <TouchableOpacity
               onPress={() => scrollViewRef.current.scrollTo({ y: 700, animated: true })}
            >
               <Text style={styles.arrow}>↓</Text>
            </TouchableOpacity>
         </View>

         {/* História */}
         <View style={styles.section}>
            <Text style={styles.sectionTitle}>História do MASP:</Text>
            <Text style={styles.history}>{data.history}</Text>
         </View>

         {/* Atrações */}
         <View>
            <Text style={styles.sectionTitle2}>Principais Atrações:</Text>
            {data.attractions.map((attraction, index) => (
               <TouchableOpacity
                  key={index}
                  onPress={() => {
                     if (attraction.name === 'Galeria Horácio Lafer') {
                        navigation.navigate('HoracioLafer');
                     }
                     // Aqui você pode adicionar mais condições para outras atrações no futuro
                  }}
                  style={styles.attraction}
               >
                  <Image source={attraction.image} style={styles.attractionImage} />
                  <Text style={styles.attractionText}>{attraction.name}</Text>
               </TouchableOpacity>
            ))}
         </View>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   backgroundImage: {
      position: 'absolute',
      resizeMode: 'stretch', // Ajusta a imagem para não distorcer
   },
   container: {
      flex: 1,
      backgroundColor: '#002b53',
   },
   content: {
      paddingBottom: 20,
   },
   header: {
      alignItems: 'center',
      paddingTop: 50,
   },
   title: {
      fontSize: 24,
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
   },
   title2: {
      fontSize: 24,
      color: '#f28500',
      fontWeight: 'bold',
      textAlign: 'center',
   },
   headerImage: {
      width: 300,
      height: 450,
      borderRadius: 100,
      marginVertical: 20,
   },
   welcome: {
      fontSize: 18,
      color: '#fff',
      textAlign: 'center',
      marginBottom: 10,
   },
   arrow: {
      fontSize: 30,
      color: '#fff',
      fontWeight: '800',
   },
   section: {
      padding: 20,
   },
   sectionTitle: {
      fontSize: 22,
      color: '#f28500',
      fontWeight: 'bold',
      marginBottom: 10,
   },
   sectionTitle2: {
      fontSize: 22,
      color: '#f28500',
      fontWeight: 'bold',
      marginBottom: 10,
      padding: 20,
   },
   attraction: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
   },
   attractionImage: {
      width: 100,
      height: 100,
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
      marginRight: 10,
   },
   attractionText: {
      fontSize: 25,
      width: 200,
      color: '#fff',
      fontWeight: '600',
   },
   history: {
      fontSize: 16,
      color: '#fff',
      lineHeight: 24,
      marginTop: 10,
   },
});

export default Masp;
