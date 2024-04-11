import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from "./ProfileScreen";
import MediaScreen from "./MediaScreen";
import MusicScreen from "./MusicScreen";
import MessagingScreen from "./MessagingScreen";
import { auth } from "../FirebaseConfig";
import { getProfile } from "../Functions/FirebaseFunctions";

const Tab = createBottomTabNavigator();

const HomePage = () => {
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfile(auth.currentUser.uid);
      if (profileData) {
        setProfileInfo(profileData);
      }
    };

    fetchProfile();
  }, [auth.currentUser.uid]); 

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Profile" 
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={26} />
          ),
        }} 
      >
        {() => <ProfileScreen profileInfo={profileInfo} />}
      </Tab.Screen>
      <Tab.Screen 
        name="Messaging" 
        component={MessagingScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-text-outline" color={color} size={26} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Media" 
        component={MediaScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="camera" color={color} size={26} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Music" 
        component={MusicScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="musical-notes" color={color} size={26} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default HomePage;
