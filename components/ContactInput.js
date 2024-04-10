import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Modal } from 'react-native';

const ContactInput = (props) => {
  const [enteredName, setName] = useState('');
  const [enteredEmail, setEmail] = useState('');

  const contactNameHandler = (text) => {
    setName(text);
  };

  const contactEmailHandler = (text) => {
    setEmail(text);
  };

  const addContactHandler = () => {

    const combinedContact = `${enteredName}/${enteredEmail}`;

    props.onAddItem(combinedContact);

    setName('');
    setEmail('');

    props.onCancel();
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={enteredName}
          onChangeText={contactNameHandler}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={enteredEmail}
          onChangeText={contactEmailHandler}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#BF1A2F' }]}
            onPress={props.onCancel}
          >
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#087E8B' }]}
            onPress={addContactHandler}
          >
            <Text style={styles.buttonText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFF7CF', 
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  button: {
    width: '48%',
    borderRadius: 10,
    overflow: 'hidden',
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});

export default ContactInput;
