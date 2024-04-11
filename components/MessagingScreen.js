import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Platform, Alert } from 'react-native';
import * as SMS from 'expo-sms';
import * as MailComposer from 'expo-mail-composer';

const MessageScreen = () => {
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState(null);

  useEffect(() => {
    showAlert();
  }, []);

  const showAlert = () => {
    Alert.alert(
      'Choose Delivery Method',
      'How would you like to send the message?',
      [
        {
          text: 'SMS',
          onPress: () => setDeliveryMethod('sms'),
        },
        {
          text: 'Email',
          onPress: () => setDeliveryMethod('email'),
        },
      ],
      { cancelable: false }
    );
  };

  const handleButtonPress = async () => {
    if (!deliveryMethod) {
      Alert.alert('Please choose a delivery method.');
      return;
    }

    if (deliveryMethod === 'sms') {
      if (!/^\d+$/.test(recipient)) {
        Alert.alert('Recipient must contain only numbers.');
        return;
      }
    } else if (deliveryMethod === 'email') {
      if (!validateEmail(recipient)) {
        Alert.alert('Please enter a valid email address.');
        return;
      }
    }

    if (deliveryMethod === 'sms') {
        try {
            const { result } = await SMS.sendSMSAsync([recipient], message);
            if (result === 'sent') {
                console.log('Message sent via SMS successfully!');
            } else {
                console.log('SMS is not available on this device');
            }
        } catch (error) {
            console.error('Error sending SMS:', error);
        }
    } else if (deliveryMethod === 'email') {
        try {
            const isAvailable = await MailComposer.isAvailableAsync();
            if (isAvailable) {
                await MailComposer.composeAsync({
                recipients: [recipient],
                subject: 'Message from your app',
                body: message,
                isHtml: false,
                });
                console.log('Message sent via email successfully!');
            } else {
                console.log('Email is not available on this device');
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
  };

  const validateEmail = (email) => {
    // Regular expression to validate email
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View>
        <TextInput
          placeholder="Recipient"
          value={recipient}
          onChangeText={setRecipient}
          keyboardType={deliveryMethod === 'sms' ? 'numeric' : 'email-address'}
        />
        <TextInput
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
        />
      </View>
      <View>
        <Button
          title="Send Message"
          onPress={handleButtonPress}
        />
      </View>
    </View>
  );
};

export default MessageScreen;

