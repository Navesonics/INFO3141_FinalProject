import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore} from "firebase/firestore"
// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCH0WNGj1wIGdUgJISzamT_EPw1-oZHEt4",
  authDomain: "info3141finalproject-9fd68.firebaseapp.com",
  projectId: "info3141finalproject-9fd68",
  storageBucket: "info3141finalproject-9fd68.appspot.com",
  messagingSenderId: "1037614276416",
  appId: "1:1037614276416:web:aaf885514c417e6b4b24a5",
  measurementId: "G-ZMZ4KJT5G9"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const db = getFirestore(FIREBASE_APP);
export const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});