import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

const search = () => {
  const [ville, setVille] = useState('');
  const [type, setType] = useState('');
  const [minPrix, setMinPrix] = useState('');
  const [maxPrix, setMaxPrix] = useState('');

  const handleSearch = () => {
    console.log('Recherche lancée avec :', { ville, type, minPrix, maxPrix });
    // Tu peux ici appeler une API ou filtrer une liste
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Recherche de propriétés</Text>

      <TextInput
        style={styles.input}
        placeholder="Ville"
        value={ville}
        onChangeText={setVille}
      />

      <TextInput
        style={styles.input}
        placeholder="Type de bien (ex: S+2, Studio)"
        value={type}
        onChangeText={setType}
      />

      <TextInput
        style={styles.input}
        placeholder="Prix minimum"
        keyboardType="numeric"
        value={minPrix}
        onChangeText={setMinPrix}
      />

      <TextInput
        style={styles.input}
        placeholder="Prix maximum"
        keyboardType="numeric"
        value={maxPrix}
        onChangeText={setMaxPrix}
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Rechercher</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default search;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,

  },
  button: {
    backgroundColor: '#1fc341',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
