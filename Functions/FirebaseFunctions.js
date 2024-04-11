//Author : E_BENITEZ

// firebaseFunctions.js
import {
  setDoc,
  deleteDoc,
  doc,
  collection,
  getDoc,
  getDocs,
  query,
  select,
} from "firebase/firestore";
import { db, auth } from "../FirebaseConfig";

export const createProfile = async (profileData) => {
  try {
    // Save the profile data to Firestore
    const userId = auth.currentUser.uid;
    const profileRef = doc(collection(db, "Profile"), userId);
    await setDoc(profileRef, profileData);

    console.log("Profile created successfully!");
    return true;
  } catch (error) {
    console.error("Error creating profile:", error);
    return false;
  }
};

export const updateProfile = async (profileData) => {
  try {
    // Update the profile data in Firestore
    const userId = auth.currentUser.uid;
    const profileRef = doc(collection(db, "profiles"), userId);
    await setDoc(profileRef, profileData, { merge: true });

    console.log("Profile updated successfully!");
    return true;
  } catch (error) {
    console.error("Error updating profile:", error);
    return false;
  }
};

export const deleteProfile = async (userId) => {
  try {
    // Delete the profile document from Firestore
    await deleteDoc(doc(collection(db, "profiles"), userId));

    console.log("Profile deleted successfully!");
    return true;
  } catch (error) {
    console.error("Error deleting profile:", error);
    return false;
  }
};

export const getProfile = async (userId) => {
  try {
    // Fetch the profile data from Firestore
    console.log(userId);
    const docRef = doc(db, "Profile", userId);
    const profileDoc = await getDoc(docRef);

    if (profileDoc.exists()) {
      return profileDoc.data();
    } else {
      console.log("No profile data found for user:", userId);
      return null;
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return null;
  }
};

//get all profiles
export const getAllProfiles = async () => {
  try {
    const q = query(collection(db, "profiles"));

    const profileSnapshot = await getDocs(q);

    const profiles = [];
    profileSnapshot.forEach((doc) => {
      const profileData = doc.data();

      const segments = doc._key.path.segments;

      const userId = segments[segments.length - 1];

      const profileWithId = {
        id: userId, 
        ...profileData, 
      };

      profiles.push(profileWithId);
    });

    return profiles;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return [];
  }
};
