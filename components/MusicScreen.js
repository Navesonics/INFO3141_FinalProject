import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AudioRecorder from './Music/AudioRecorder';
import AudioPlayer from './Music/AudioPlayer';
import RecordedAudioList from './Music/RecordedAudioList';

export default function MusicScreen() {
  const [recordedAudios, setRecordedAudios] = useState([]);
  const [selectedAudioIndex, setSelectedAudioIndex] = useState(-1);

  const handleRecordingComplete = (audioURI) => {
    setRecordedAudios((prevRecordedAudios) => [...prevRecordedAudios, audioURI]);
  };

  const handleAudioSelection = (index) => {
    setSelectedAudioIndex(index);
  };

  return (
    <View style={styles.container}>
      <AudioRecorder onRecordingComplete={handleRecordingComplete} />
      <AudioPlayer lastRecordedAudioURI={recordedAudios[recordedAudios.length - 1]} />
      <RecordedAudioList
        recordedAudios={recordedAudios}
        onAudioSelect={handleAudioSelection}
        selectedAudioIndex={selectedAudioIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
