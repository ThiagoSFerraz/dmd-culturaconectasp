import React, { useEffect, useState } from 'react';
import {
   View,
   Text,
   TextInput,
   Alert,
   TouchableOpacity,
   StyleSheet,
   Image,
   FlatList,
   KeyboardAvoidingView,
   Platform,
} from 'react-native';
import {
   collection,
   addDoc,
   query,
   orderBy,
   onSnapshot,
   doc,
   deleteDoc,
   updateDoc,
   getDoc,
} from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';

const PostScreen = () => {
   const [posts, setPosts] = useState([]);
   const [content, setContent] = useState('');
   const [imageUri, setImageUri] = useState(null);
   const [editingPostId, setEditingPostId] = useState(null);
   const [editingContent, setEditingContent] = useState('');
   const [userName, setUserName] = useState('');

   const currentUser = FIREBASE_AUTH.currentUser;

   const loadUserName = async () => {
      if (!currentUser) return;

      try {
         const userDoc = doc(FIREBASE_DB, 'profiles', currentUser.uid);
         const userSnap = await getDoc(userDoc);

         if (userSnap.exists()) {
            const userData = userSnap.data();
            setUserName(userData.nickname || 'Anônimo');
         }
      } catch (error) {
         console.error('Erro ao carregar nome do usuário:', error);
      }
   };

   const loadPosts = () => {
      const postsQuery = query(
         collection(FIREBASE_DB, 'posts'),
         orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
         const postData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));
         setPosts(postData);
      });

      return unsubscribe;
   };

   const publishPost = async () => {
      if (!currentUser || !content.trim()) {
         Alert.alert('Erro', 'Conteúdo do post não pode estar vazio.');
         return;
      }

      try {
         const newPost = {
            content: content.trim(),
            authorId: currentUser.uid,
            authorName: userName || 'Anônimo',
            createdAt: new Date(),
         };

         if (imageUri) {
            newPost.imageUri = imageUri;
         }

         await addDoc(collection(FIREBASE_DB, 'posts'), newPost);

         setContent('');
         setImageUri(null);
      } catch (error) {
         console.error('Erro ao publicar post:', error);
      }
   };

   const deletePost = async (postId) => {
      try {
         await deleteDoc(doc(FIREBASE_DB, 'posts', postId));
      } catch (error) {
         console.error('Erro ao deletar post:', error);
      }
   };

   const editPost = async () => {
      if (!editingContent.trim()) {
         Alert.alert('Erro', 'O conteúdo do post não pode estar vazio.');
         return;
      }

      try {
         const postRef = doc(FIREBASE_DB, 'posts', editingPostId);
         await updateDoc(postRef, { content: editingContent.trim() });
         setEditingPostId(null);
         setEditingContent('');
      } catch (error) {
         console.error('Erro ao editar post:', error);
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
         setImageUri(result.assets[0].uri);
      }
   };

   useEffect(() => {
      loadUserName();
      const unsubscribe = loadPosts();
      return () => unsubscribe();
   }, []);

   const renderPostItem = ({ item }) => (
      <View style={styles.postContainer}>
         <Text style={styles.authorName}>{item.authorName || 'Anônimo'}</Text>
         <Text style={styles.postContent}>{item.content}</Text>
         {item.imageUri && (
            <Image source={{ uri: item.imageUri }} style={styles.postImage} />
         )}

         {item.authorId === currentUser?.uid && (
            <View style={styles.actions}>
               <TouchableOpacity
                  onPress={() => {
                     setEditingPostId(item.id);
                     setEditingContent(item.content);
                  }}
               >
                  <Text style={styles.editButton}>Editar</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => deletePost(item.id)}>
                  <Text style={styles.deleteButton}>Excluir</Text>
               </TouchableOpacity>
            </View>
         )}

         {/* Interface de edição condicional */}
         {editingPostId === item.id && (
            <View style={styles.editContainer}>
               <TextInput
                  style={styles.editInput}
                  value={editingContent}
                  onChangeText={setEditingContent}
                  placeholder="Edite o conteúdo do post..."
               />
               <TouchableOpacity style={styles.saveButton} onPress={editPost}>
                  <Text style={styles.saveButtonText}>Salvar</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                     setEditingPostId(null);
                     setEditingContent('');
                  }}
               >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
               </TouchableOpacity>
            </View>
         )}
      </View>
   );

   return (
      <KeyboardAvoidingView
         style={{ flex: 1, backgroundColor: '#002b53' }}
         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
         <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={renderPostItem}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={
               <View style={styles.headerContainer}>
                  <Text style={styles.title}>Posts</Text>
                  <TextInput
                     placeholder="Escreva um post..."
                     value={content}
                     onChangeText={setContent}
                     style={styles.input}
                  />
                  <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                     <Text style={styles.addImageText}>Adicionar Imagem</Text>
                  </TouchableOpacity>
                  {imageUri && (
                     <Image source={{ uri: imageUri }} style={styles.selectedImage} />
                  )}
                  <TouchableOpacity style={styles.publishButton} onPress={publishPost}>
                     <Text style={styles.addImageText}>Publicar</Text>
                  </TouchableOpacity>
               </View>
            }
         />
      </KeyboardAvoidingView>
   );
};

const styles = StyleSheet.create({
   listContent: {
      padding: 20, // Espaçamento para os itens
      paddingTop: 50,
   },
   headerContainer: {
      alignItems: 'center',
      marginBottom: 20,
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#fff',
   },
   input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 25,
      padding: 10,
      width: '100%',
      backgroundColor: '#fff',
      marginBottom: 10,
   },
   imageButton: {
      backgroundColor: '#E9820A',
      borderRadius: 25,
      padding: 10,
      width: '100%',
      alignItems: 'center',
      marginBottom: 10,
   },
   publishButton: {
      backgroundColor: '#1a79b0',
      borderRadius: 25,
      padding: 10,
      width: '100%',
      alignItems: 'center',
      marginBottom: 10,
   },
   addImageText: {
      color: '#fff',
      fontWeight: 'bold',
   },
   selectedImage: {
      width: '100%',
      height: 200,
      borderRadius: 8,
      marginBottom: 10,
   },
   postContainer: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 15,
      marginBottom: 15,
   },
   authorName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
   },
   postContent: {
      fontSize: 14,
      marginBottom: 10,
   },
   postImage: {
      width: '100%',
      height: 200,
      borderRadius: 8,
   },
   actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
   },
   editButton: {
      color: '#007BFF',
      fontWeight: 'bold',
   },
   deleteButton: {
      color: '#FF0000',
      fontWeight: 'bold',
   },
   editContainer: {
      marginTop: 10,
      backgroundColor: '#f5f5f5',
      padding: 10,
      borderRadius: 8,
   },
   editInput: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
      backgroundColor: '#fff',
   },
   saveButton: {
      backgroundColor: '#E9820A',
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 5,
   },
   saveButtonText: {
      color: '#fff',
      fontWeight: 'bold',
   },
   cancelButton: {
      backgroundColor: '#ccc',
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
   },
   cancelButtonText: {
      color: '#333',
      fontWeight: 'bold',
   },
});

export default PostScreen;
