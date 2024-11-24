import React, { useState, useEffect } from 'react';
import {
   View,
   Text,
   TextInput,
   Button,
   Image,
   StyleSheet,
   TouchableOpacity,
   Alert,
} from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import {
   doc,
   getDoc,
   setDoc,
   collection,
   query,
   where,
   getDocs,
} from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
   const [nickname, setNickname] = useState('');
   const [username, setUsername] = useState('');
   const [profilePicture, setProfilePicture] = useState<string | null>(null);
   const [loading, setLoading] = useState(false);
   const [editing, setEditing] = useState(false); // Controla o modo de edição

   const user = FIREBASE_AUTH.currentUser;

   useEffect(() => {
      if (user) {
         loadProfile();
      }
   }, []);

   const loadProfile = async () => {
      setLoading(true);
      try {
         const profileRef = doc(FIREBASE_DB, 'profiles', user.uid);
         const profileSnap = await getDoc(profileRef);

         if (profileSnap.exists()) {
            const data = profileSnap.data();
            setNickname(data.nickname || '');
            setUsername(data.username || '');
            setProfilePicture(data.profilePicture || null);
         }
      } catch (error) {
         console.log('Erro ao carregar perfil:', error);
         Alert.alert('Erro', 'Não foi possível carregar seu perfil.');
      } finally {
         setLoading(false);
      }
   };

   const checkUsernameUnique = async (username: string): Promise<boolean> => {
      try {
         const profilesRef = collection(FIREBASE_DB, 'profiles');
         const q = query(profilesRef, where('username', '==', username));
         const querySnapshot = await getDocs(q);

         return querySnapshot.empty; // Retorna `true` se não houver duplicatas
      } catch (error) {
         console.log('Erro ao verificar unicidade do arroba:', error);
         return false;
      }
   };

   const saveProfile = async () => {
      if (!nickname || !username) {
         Alert.alert('Erro', 'Preencha todos os campos.');
         return;
      }

      // Certificar que o arroba começa com '@'
      const formattedUsername = username.startsWith('@') ? username : `@${username}`;

      // Caso o usuário esteja apenas alterando o nome ou foto de perfil, não valida o arroba
      const isUnique =
         username === formattedUsername ||
         !(await checkUsernameUnique(formattedUsername));

      if (!isUnique) {
         Alert.alert('Erro', 'Esse arroba já está em uso. Escolha outro.');
         return;
      }

      try {
         const profileRef = doc(FIREBASE_DB, 'profiles', user.uid);
         await setDoc(profileRef, {
            nickname,
            username: formattedUsername,
            profilePicture,
         });
         Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
         setEditing(false); // Desativa o modo de edição
      } catch (error) {
         console.log('Erro ao salvar perfil:', error);
         Alert.alert('Erro', 'Não foi possível salvar seu perfil.');
      }
   };

   const pickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [1, 1],
         quality: 1,
      });

      if (!result.canceled) {
         setProfilePicture(result.assets[0].uri);
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
         {/* Foto e Nome */}
         <View style={styles.profileHeader}>
            <TouchableOpacity onPress={pickImage}>
               <Image
                  source={
                     profilePicture
                        ? { uri: profilePicture }
                        : require('../../assets/default-avatar.png')
                  }
                  style={styles.profileImage}
               />
            </TouchableOpacity>
            <View style={styles.profileInfo}>
               <Text style={styles.nickname}>{nickname}</Text>
               <Text style={styles.username}>{username}</Text>
            </View>
         </View>

         {/* Edição de Perfil */}
         {editing ? (
            <>
               <TextInput
                  style={styles.input}
                  placeholder="Apelido"
                  value={nickname}
                  onChangeText={setNickname}
               />
               <TextInput
                  style={styles.input}
                  placeholder="@seuarroba"
                  value={username}
                  onChangeText={(text) => {
                     // Certificar que o símbolo @ seja mantido
                     if (!text.startsWith('@')) {
                        setUsername(`@${text}`);
                     } else {
                        setUsername(text);
                     }
                  }}
               />
               <TouchableOpacity style={styles.customButton} onPress={saveProfile}>
                  <Text style={styles.buttonText}>Salvar Perfil</Text>
               </TouchableOpacity>
            </>
         ) : (
            <TouchableOpacity
               style={styles.customButton}
               onPress={() => setEditing(true)}
            >
               <Text style={styles.buttonText}>Editar Perfil</Text>
            </TouchableOpacity>
         )}

         {/* Botão de Logout */}
         <TouchableOpacity
            style={styles.logOutButton}
            onPress={() => FIREBASE_AUTH.signOut()}
         >
            <Text style={styles.buttonText}>sair</Text>
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
      paddingTop: 50,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#002b53',
   },
   profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      width: '100%',
      justifyContent: 'space-between',
   },
   profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
      borderWidth: 5,
      borderColor: '#E9820A',
   },
   profileInfo: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginLeft: 20,
   },
   nickname: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
   username: { fontSize: 16, color: '#fff' },
   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
   input: {
      width: '100%',
      padding: 10,
      borderWidth: 2,
      borderColor: '#E9820A',
      backgroundColor: '#fff',
      borderRadius: 25,
      marginBottom: 20,
   },
   editProfileText: { color: '#007bff', marginTop: 20 },
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
   logOutButton: {
      backgroundColor: '#F00', // Cor de fundo
      paddingVertical: 15, // Altura do botão
      paddingHorizontal: 30, // Largura do botão
      borderRadius: 25, // Bordas arredondadas
      alignItems: 'center', // Centraliza o texto
      marginTop: 50, // Espaçamento vertical
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
});

export default ProfileScreen;
