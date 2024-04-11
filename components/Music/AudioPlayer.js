//Author : E_BENITEZ

//AudioPlayer.js
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Audio, InterruptionModeIOS , InterruptionModeAndroid} from 'expo-av';

export default function AudioPlayer({ lastRecordedAudioURI  }) {
  let audioObject = null;
  const [isMuted, setIsMuted] = useState(false);

  const playLastRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
      });

      audioObject = new Audio.Sound();
      await audioObject.loadAsync({ uri: lastRecordedAudioURI });
      await audioObject.setStatusAsync({ isLooping: true, isMuted: isMuted });
      await audioObject.playAsync();
      console.log('Recording playback started');
    } catch (error) {
      console.error('An error occurred on playback:', error);
    }
  };

  const stopPlayback = async () => {
    try {
        if (audioObject) {
            await audioObject.stopAsync();
            await audioObject.unloadAsync();
            console.log('Playback stopped');
        }
    } catch (error) {
        console.error('An error occurred while stopping playback:', error);
    }
  };

  const mutePlayback = () => {
    setIsMuted(prevIsMuted => !prevIsMuted); 
    if (audioObject) {
        audioObject.setIsMutedAsync(!isMuted)
        .then(() => {
          if (isMuted) {
            console.log('Recording is Unmuted');
          }
          else{
            console.log('Recording is Mute');
          }
            
        })
        .catch(error => {
          console.error('An error occurred while muting playback:', error);
        });
    }
 }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={playLastRecording} style={styles.button}>
        <Text>Play</Text>
      </TouchableOpacity>
      <View style={styles.space} />
      <TouchableOpacity onPress={stopPlayback} style={styles.button}>
        <Text>Stop</Text>
      </TouchableOpacity>
      <View style={styles.space} />
      <TouchableOpacity onPress={mutePlayback} style={styles.button}>
        <Text>{isMuted ? 'Unmute' : 'Mute'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#D4C5E2',
    padding: 15,
    borderRadius: 5,
  },
  space: {
    width: 50,
  },
});
