import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
//import * as firebase from "firebase";

const FileScreen = () => {
  const [fileLocation, setFileLocation] = useState("");

  const handleBrowse = () => {
    // Logic to browse for file location
    // For example, you can use a file picker library or native file browsing APIs
    Alert.alert("Browse functionality is not implemented yet.");
  };

  const handleUpload = () => {
    if (fileLocation.trim() === "") {
      Alert.alert("Please enter a file location.");
      return;
    }

    // Logic to upload file to Firebase
    // Replace 'your-storage-bucket' with your Firebase storage bucket name
    // const storageRef = firebase.storage().ref();
    // const fileRef = storageRef.child(fileLocation);
    // fileRef.put(fileLocation)
    //   .then(() => {
    //     Alert.alert("File uploaded successfully.");
    //   })
    //   .catch((error) => {
    //     Alert.alert("Error uploading file:", error.message);
    //   });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter file location"
          value={fileLocation}
          onChangeText={setFileLocation}
        />
        <Button title="Browse" onPress={handleBrowse} />
      </View>
      <Button title="Upload" onPress={handleUpload} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc"
  }
});

export default FileScreen;
