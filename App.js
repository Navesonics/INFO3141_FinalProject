//App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignUpPage";
//import CreateProfilePage from './components/ContactInput';
import HomePage from "./components/HomePage";
import MediaScreen from "./components/MediaScreen";
import MusicScreen from "./components/MusicScreen";
import ProfileScreen from "./components/ProfileScreen";
//import FileScreen from "./components/FileScreen";
import AddItemScreen from "./components/Media/AddItemScreen";
//import { firestoreDB, auth } from "./FirebaseConfig";


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{
            headerStyle: { backgroundColor: "#28587B" },
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupPage}
          options={{
            headerStyle: { backgroundColor: "#28587B" },
          }}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{
            headerStyle: { backgroundColor: '#28587B' },
            title: 'Home',
          }}
        />
        <Stack.Screen
          name="MediaScreen"
          component={MediaScreen}
          options={{
            headerStyle: { backgroundColor: '#28587B' },
            title: 'Media',
          }}
        />
        <Stack.Screen
          name="MusicScreen"
          component={MusicScreen}
          options={{
            headerStyle: { backgroundColor: '#28587B' },
            title: 'Music',
          }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerStyle: { backgroundColor: '#28587B' },
            title: 'Profile',
          }}
        />
        <Stack.Screen
          name="AddItemScreen"
          component={AddItemScreen}
          options={{
            headerStyle: { backgroundColor: '#28587B' },
            title: 'Add Item Screen',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
