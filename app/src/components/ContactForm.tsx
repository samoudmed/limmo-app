import React, { useState } from 'react';
import { Alert, Button, Linking, StyleSheet, Text, TextInput, View } from 'react-native';

type ContactFormProps = {
  phoneNumber: string;
  listingId: number;
};

export default function ContactForm({ phoneNumber, listingId }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleCall = () => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      Alert.alert('Numéro non disponible');
    }
  };

  const handleSend = async () => {
    if (!name || !email || !message) {
      Alert.alert('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone: phoneNumber,
          message,
          listingId,
        }),
      });

      if (response.ok) {
        Alert.alert('Message envoyé avec succès');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const errorData = await response.json();
        Alert.alert('Erreur', errorData.message || 'Erreur lors de l’envoi');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de contacter le serveur');
      console.error(error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacter l'agence</Text>

      <Button title="📞 Appeler" onPress={handleCall} />

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Adresse email"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Votre message"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <Button title="📤 Envoyer le message" onPress={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
