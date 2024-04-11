//LoginPage.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LogoImage from "./Logo";
import { styles } from "./styles";
import {firestoreDB, auth } from "../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = ({ route }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigation = useNavigation();
 

  const handleEmailChange = (text) => {
    setLoginEmail(text);
  };

  const handlePasswordChange = (text) => {
    setLoginPassword(text);
  };

   loginWithFirebase = async () => {
        if (loginEmail.length < 4) {
            Alert.alert("Please enter an email address.");
            return;
        }

        if (loginPassword.length < 4) {
            Alert.alert("Please enter a password.");
            return;
        }

        try {
            console.log(auth); 
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword); 
            setLoggedIn(true);
            setLoginPassword('');
            setLoginPassword('');
            navigation.navigate('HomePage');
        } catch (error) {
                console.error("Login Error:", error);
                if (error && error.code === "auth/wrong-password") {
                Alert.alert("Wrong password.");
                } else {
                Alert.alert("Login failed: Please recheck the email and password and try again.");
                }
                setLoggedIn(false);
        }
        
   };

  const handleSignup = () => {
    navigation.navigate("Signup");
  };



  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <LogoImage width={350} height={350}/>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={loginEmail}
          onChangeText={handleEmailChange}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCompleteType="email"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={loginPassword}
          onChangeText={handlePasswordChange}
          secureTextEntry
        />
        <View style={styles.buttonContainerLogin}>
          <TouchableOpacity onPress={loginWithFirebase} style={[styles.button, { backgroundColor: "#9FB798", height: 50, borderRadius: 25 }]}>
            <Text style={{ color: "#FFF", textAlign: "center", fontSize: 18 }}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainerSignup}>
          <TouchableOpacity onPress={handleSignup} style={[styles.button, { backgroundColor: "#9FB798", height: 50, borderRadius: 25 }]}>
            <Text style={{ color: "#FFF", textAlign: "center", fontSize: 18 }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


export default LoginPage;
