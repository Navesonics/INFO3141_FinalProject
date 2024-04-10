import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList } from 'react-native';

import ContactList from './components/ContactList';
import ContactInput from './components/ContactInput';

export default function App() {
  const [contactList, setContactList] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addContactItemHandler = (contactItem) => {
    setContactList((prevContactList) => [
      ...prevContactList,
      { key: Math.random().toString(), value: contactItem },
    ]);
    setIsAddMode(false);
  };

  const removeContactItemHandler = (itemId) => {
    setContactList((prevContactList) =>
      prevContactList.filter((item) => item.key !== itemId)
    );
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Lab4 UI Basics e_benitez</Text>
      <FlatList
        data={contactList}
        renderItem={(itemData) => (
          <ContactList
            id={itemData.item.key}
            onDelete={removeContactItemHandler}
            item={itemData.item.value}
          />
        )}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setIsAddMode(true)}
        style={styles.addButton}
      >
        <Text style={styles.buttonText}>Add Contact</Text>
      </TouchableOpacity>

      <ContactInput
        visible={isAddMode}
        onCancel={() => setIsAddMode(false)}
        onAddItem={addContactItemHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
    backgroundColor: '#EFF7CF',
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#087E8B',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});
