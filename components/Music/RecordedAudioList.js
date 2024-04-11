import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const extractFilename = uri => {
  const parts = uri.split('/');
  return parts[parts.length - 1];
};

export default function RecordedAudioList({ recordedAudios, onSelectAudio }) {
  const handleAudioSelection = (audio) => {
    onSelectAudio(audio);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recorded Audios:</Text>
      {recordedAudios.map((audio, index) => (
        <TouchableOpacity key={index} onPress={() => handleAudioSelection(audio)}>
          <Text style={styles.audio}>{extractFilename(audio)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  audio: {
    fontSize: 16,
    marginBottom: 5,
  },
});
