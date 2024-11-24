import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';

import Login from './app/screens/Login';
import Home from './app/screens/Home';
import QuizScreen from './app/screens/QuizScreen'; // Adicione a tela do Quiz
import QuizFeedbackScreen from './app/screens/QuizFeedbackScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import PostScreen from './app/screens/PostScreen';
import Museu from './app/screens/Museu';
import Masp from './app/screens/Masp';
import Pinacoteca from './app/screens/Pinacoteca';
import HoracioLafer from './app/screens/HoracioLafer';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator<{
   Home: undefined;
   QuizScreen: { theme: string };
}>();

// Layout para rotas internas (após login)
function InsideLayout() {
   return (
      <InsideStack.Navigator>
         <InsideStack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
         />
         <InsideStack.Screen
            name="QuizScreen"
            component={QuizScreen}
            options={{
               title: 'Quiz',
               headerStyle: {
                  backgroundColor: '#073F66',
               },
               headerTintColor: '#fff',
               headerTitleAlign: 'center',
               headerTitleStyle: {
                  fontWeight: 'bold',
               },
            }}
         />
         <InsideStack.Screen
            name="QuizFeedbackScreen"
            component={QuizFeedbackScreen}
            options={{
               title: 'Feedback',
               headerStyle: {
                  backgroundColor: '#073F66',
               },
               headerTintColor: '#fff',
               headerTitleAlign: 'center',
               headerTitleStyle: {
                  fontWeight: 'bold',
               },
            }}
         />
         <InsideStack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ headerShown: false }}
         />
         <InsideStack.Screen
            name="PostScreen"
            component={PostScreen}
            options={{ headerShown: false }}
         />
         <InsideStack.Screen
            name="Museu"
            component={Museu}
            options={{ headerShown: false }}
         />
         <InsideStack.Screen
            name="Masp"
            component={Masp}
            options={{ headerShown: false }}
         />
         <InsideStack.Screen
            name="Pinacoteca"
            component={Pinacoteca}
            options={{ headerShown: false }}
         />
         <InsideStack.Screen
            name="HoracioLafer"
            component={HoracioLafer}
            options={{ headerShown: false }}
         />
      </InsideStack.Navigator>
   );
}

export default function AppNavigator() {
   const [user, setUser] = useState<User | null>(null);

   // Monitora o estado do usuário autenticado
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
         console.log('Usuário logado:', user);
         setUser(user);
      });

      return () => unsubscribe();
   }, []);

   return (
      <NavigationContainer>
         <Stack.Navigator>
            {user ? (
               <Stack.Screen
                  name="InsideLayout"
                  component={InsideLayout}
                  options={{ headerShown: false }} // Oculta o header principal
               />
            ) : (
               <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ headerShown: false }} // Oculta o header no login
               />
            )}
         </Stack.Navigator>
      </NavigationContainer>
   );
}
