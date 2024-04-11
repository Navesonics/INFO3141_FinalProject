import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProfileScreen = ({ profileInfo }) => {
  if (!profileInfo) {
    return <Text>Loading...</Text>;
  }
  else
  {
    console.log("Birthdate: ", profileInfo.dob);
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/male-avatar_01.jpg")} style={styles.profileImage} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>First Name:</Text>
        <Text style={styles.text}>{profileInfo.firstName}</Text>
        <Text style={styles.label}>Last Name:</Text>
        <Text style={styles.text}>{profileInfo.lastName}</Text>
        <Text style={styles.label}>Birthdate:</Text>
        <Text style={styles.text}>{formatDate(profileInfo.dob)}</Text>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.text}>{calculateAge(profileInfo.dob)}</Text>
      </View>
    </View>
  );
};

// Function to format date (e.g., "MMM DD, YYYY")
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  });
};

// Function to calculate age
const calculateAge = (birthdate) => {
  const dob = new Date(birthdate);
  const now = new Date();
  const diff = now - dob;
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 75,
    overflow: "hidden" // Ensure the image is clipped to the border radius
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75 // Half of width/height to create a circular image
  },
  infoContainer: {
    alignItems: "center"
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    marginBottom: 10
  }
});

export default ProfileScreen;
