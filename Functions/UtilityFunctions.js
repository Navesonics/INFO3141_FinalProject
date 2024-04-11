//Author : E_BENITEZ

//UtilityFunctions.js
import { Timestamp } from 'firebase/firestore';
//utility functions

export const calculateAge = (birthDate) => {
 
  // Check if 'dob' is a Timestamp object from Firestore
 if (birthDate instanceof Timestamp) {
  dobDate = birthDate.toDate(); // Convert Timestamp to Date object
} else if (typeof birthDate === 'object') {
  dobDate = birthDate; // Assume 'dob' is already a Date object
} else {
  // Handle other formats (e.g., milliseconds, string)
  dobDate = new Date(birthDate); // Attempt to parse 'dob' as a date string
}


  const today = new Date();
  let userAge = today.getFullYear() - dobDate.getFullYear();
  const monthDifference = today.getMonth() - dobDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < dobDate.getDate())
  ) {
    userAge--;
  }

  return userAge;
};
