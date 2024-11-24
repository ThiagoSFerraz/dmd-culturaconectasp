import {
   View,
   Text,
   StyleSheet,
   TextInput,
   ActivityIndicator,
   Button,
   KeyboardAvoidingView,
   TouchableOpacity,
   Image,
} from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
} from 'firebase/auth';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);
   const auth = FIREBASE_AUTH;

   const signIn = async () => {
      setLoading(true);
      try {
         const response = await signInWithEmailAndPassword(auth, email, password);
         console.log(response);
      } catch (error: any) {
         console.log(error);
         alert('Login falhou' + error.message);
      } finally {
         setLoading(false);
      }
   };

   const signUp = async () => {
      setLoading(true);
      try {
         const response = await createUserWithEmailAndPassword(auth, email, password);
         console.log(response);
         alert('Conta criada!');
      } catch (error: any) {
         console.log(error);
         alert('Registro falhou falhou' + error.message);
      } finally {
         setLoading(false);
      }
   };

   return (
      <View style={styles.container}>
         <Image
            source={require('../../assets/adorno_lateral_cima.png')}
            style={[styles.backgroundImage, styles.topLeft]}
         />
         <Image
            source={require('../../assets/adorno_lateral_baixo.png')}
            style={[styles.backgroundImage, styles.bottomRight]}
         />
         <KeyboardAvoidingView behavior="padding">
            <TextInput
               value={email}
               style={styles.input}
               placeholder="Email"
               autoCapitalize="none"
               onChangeText={(text) => setEmail(text)}
            />
            <TextInput
               value={password}
               style={styles.input}
               placeholder="Senha"
               autoCapitalize="none"
               onChangeText={(text) => setPassword(text)}
               secureTextEntry={true}
            />
         </KeyboardAvoidingView>
         {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
         ) : (
            <>
               <TouchableOpacity style={styles.customButton} onPress={signIn}>
                  <Text style={styles.buttonText}>Entrar</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.customButton2} onPress={signUp}>
                  <Text style={styles.buttonText}>Registrar</Text>
               </TouchableOpacity>
            </>
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   background: {
      backgroundColor: '#073F66',
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
   container: {
      padding: 20,
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#073F66',
   },
   input: {
      marginVertical: 10,
      height: 50,
      borderWidth: 1,
      borderRadius: 25,
      padding: 15,
      backgroundColor: '#fff',
   },
   customButton: {
      backgroundColor: '#E9820A', // Cor de fundo

      paddingVertical: 15, // Altura do botão
      paddingHorizontal: 10, // Largura do botão
      borderRadius: 25, // Bordas arredondadas
      alignItems: 'center', // Centraliza o texto
      marginTop: 30, // Espaçamento vertical
      elevation: 3, // Sombra (em dispositivos Android)
      shadowColor: '#000', // Cor da sombra (iOS)
      shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra (iOS)
      shadowOpacity: 0.8, // Opacidade da sombra (iOS)
      shadowRadius: 2, // Raio da sombra (iOS)
   },
   customButton2: {
      backgroundColor: '#1a79b0', // Cor de fundo

      paddingVertical: 15, // Altura do botão
      paddingHorizontal: 10, // Largura do botão
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

export default Login;
