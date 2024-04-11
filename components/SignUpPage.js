import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../FirebaseConfig";
import { createProfile } from '../Functions/FirebaseFunctions';
import LogoImage from './Logo';
import DatePicker from 'react-native-modal-datetime-picker'; // Import DatePicker component
import moment from 'moment'; 
import { useNavigation } from "@react-navigation/native";

const SignupPage = () => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    dob: new Date(),
  });
  const [registrationEmail, setRegistrationEmail] = useState('');
  const [registrationPassword, setRegistrationPassword] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // State for date picker visibility
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date
  const navigation = useNavigation();


  const handleFirstNameChange = (text) => {
    setPersonalInfo({ ...personalInfo, firstName: text });
  };

  const handleLastNameChange = (text) => {
    setPersonalInfo({ ...personalInfo, lastName: text });
  };

  const handleEmailChange = (text) => {
    setRegistrationEmail(text);
  };

  const handlePasswordChange = (text) => {
    setRegistrationPassword(text);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

const handleDateConfirm = (date) => {
    setSelectedDate(date);
    setPersonalInfo({ ...personalInfo, dob: moment(date).format("YYYY-MM-DD") }); // Format the selected date
    hideDatePicker();
  };


  const registerWithFirebase = async () => {
    // Validation checks
    if (personalInfo.firstName === '' || personalInfo.lastName === '' || personalInfo.dob === '') {
      Alert.alert('Please fill in all required fields.');
      return;
    }
    const profileData = {
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        dob: personalInfo.dob,
    };

    if (registrationEmail.length < 4) {
      Alert.alert('Please enter a valid email address.');
      return;
    }

    if (registrationPassword.length < 6) {
      Alert.alert('Password should be at least 6 characters long.');
      return;
    }

    try {
      // Register user with Firebase
      console.log("createUserWithEmailAndPassword 1");
      await createUserWithEmailAndPassword(auth, registrationEmail, registrationPassword);
      Alert.alert("User registered!");
      console.log("createUserWithEmailAndPassword 2");
      // Clear input fields after successful registration
      setPersonalInfo({ firstName: "", lastName: "", dob: new Date() });
      setRegistrationEmail('');
      setRegistrationPassword('');
      console.log("createProfile 1");
      await createProfile(profileData).then((success) => {
        if (success) {
          console.log("Profile created successfully!");
        } else {
            console.log("createProfile 2");
          console.error("Failed to create profile.");
        }
      })
      .catch((error) => {
        console.log("createProfile 3");
        console.error("Error:", error);
      });

      // Navigate to the next screen if needed
      navigation.navigate('Login');
    } catch (error) {
      let errorCode = error.code;
      console.log("errorCode : ", errorCode);

      if (errorCode === 'auth/weak-password') {
        Alert.alert('The password is too weak.');
      } else {
        Alert.alert(`Registration failed: Please recheck the email and password and try again.`)
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <LogoImage width={350} height={350}/>
      </View>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={personalInfo.firstName}
        onChangeText={handleFirstNameChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={personalInfo.lastName}
        onChangeText={handleLastNameChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Birthdate"
        value={moment(personalInfo.dob).format("MM/DD/YYYY")} // Display formatted date
        onFocus={showDatePicker} // Show date picker on focus
      />
      <DatePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={registrationEmail}
        onChangeText={handleEmailChange}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCompleteType="email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={registrationPassword}
        onChangeText={handlePasswordChange}
        secureTextEntry
      />
      <Button title="Sign up" onPress={registerWithFirebase} color="#FF1493" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
    logoContainer: {
    paddingTop: 30,
    padding: 20,
  },
});

export default SignupPage;
