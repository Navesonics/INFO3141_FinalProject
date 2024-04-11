//Author : E_BENITEZ

//AudioRecorder.js
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text , Alert} from 'react-native';
import { Audio, InterruptionModeIOS , InterruptionModeAndroid} from 'expo-av';

export default function AudioRecorder({ onRecordingComplete }) {
  let recording = null;

  const verifyPermissions = async () => {
    const { status } = await Audio.getPermissionsAsync();
    if (status !== 'granted') {
        const { status: newStatus } = await Audio.requestPermissionsAsync();
        if (newStatus !== 'granted') {
            Alert.alert(
              'Insufficient Permissions!',
              'You need to grant audio recording permissions to use this app.',
              [{ text: 'Okay' }]
            );
            return false;
        }
    }
    return true;
  };

  const startRecording = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return false;
    } 
    else {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          playThroughEarpieceAndroid: false,
          staysActiveInBackground: true,
        });

        recording = new Audio.Recording();
        try {
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            console.log('Recording started');
        } catch (error) {
            console.error('An error occurred on starting record: ', error);
        }
    }
  };

  const stopRecording = async () => {
    try {
        await recording.stopAndUnloadAsync();
        console.log('Recording stopped');
        onRecordingComplete(recording.getURI());
      } catch (error) {
        console.error('An error occurred on stopping record:', error);
      }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={startRecording} style={[styles.button, styles.startButton]}>
        <Text>Start</Text>
      </TouchableOpacity>
      <View style={styles.space} />
      <TouchableOpacity onPress={stopRecording} style={[styles.button, styles.stopButton]}>
        <Text>Stop</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50,
  },
  button: {
    padding: 30,
    borderRadius: 10,
  },
  startButton: {
    backgroundColor: '#90EE90', 
  },
  stopButton: {
    backgroundColor: '#F25757', 
  },
  space: {
    width: 20,
  },
});
