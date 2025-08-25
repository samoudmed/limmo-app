import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';


export default function Account() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [logo, setLogo] = useState(null);

  const pickLogo = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const asset = response.assets?.[0];
        if (asset) {
          console.log("Selected image:", asset);
          setLogo(asset);
        }
      }
    });
  };

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'account/my-account' }],
        });
      }
    };

    checkUserLoggedIn();
  }, []);

  const handleSend = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userId', data.id);

        Alert.alert('Succès', 'Connecté avec succès !');
        navigation.reset({ index: 0, routes: [{ name: 'account/my-account' }] });
      } else {
        Alert.alert('Erreur', data.error || 'Identifiants invalides');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de contacter le serveur');
      console.error(error);
    }
  };

  const handleRegister = async () => {
    console.log("eee");
    try {
      const formData = new FormData();

      formData.append('lastName', lastName);
      formData.append('firstName', firstName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phone', phone);
      formData.append('company', company);

      if (logo && logo.uri && logo.type && (logo.fileName || logo.uri.split('/').pop())) {
        formData.append('logo', {
          uri: logo.uri,
          type: logo.type,
          name: logo.fileName || logo.uri.split('/').pop(), // fallback if fileName is missing
        });
      } else {
        console.warn('Logo not appended. Invalid logo object:', logo);
      }


      const response = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Succès', 'Inscription réussie !');
        setIsLogin(true);
      } else {
        Alert.alert('Erreur', data.message || 'Erreur d’inscription');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de contacter le serveur');
      console.error(error);
    }
  };


  const handleAuth = () => {
    if (!email || !password || (!isLogin && (!lastName || !firstName || !phone || !company))) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    isLogin ? handleSend() : handleRegister();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Connexion' : 'Inscription'}</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!isLogin && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nom"
              value={lastName}
              onChangeText={setLastName}
            />
            <TextInput
              style={styles.input}
              placeholder="Prénom"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Téléphone"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
            <TextInput
              style={styles.input}
              placeholder="Société"
              value={company}
              onChangeText={setCompany}
            />

            <TouchableOpacity style={styles.uploadButton} onPress={pickLogo}>
              <Text style={styles.uploadButtonText}>
                {logo ? 'Logo sélectionné' : 'Télécharger un logo'}
              </Text>
            </TouchableOpacity>
          </>
        )}

        <TextInput
          style={styles.input}
          placeholder="Adresse email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>{isLogin ? 'Se connecter' : 'S’inscrire'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switchText}>
            {isLogin ? "Pas encore de compte ? S'inscrire" : 'Déjà un compte ? Se connecter'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    color: '#071c47',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#071c47',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  switchText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#007bff',
  },
  uploadButton: {
    backgroundColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadButtonText: {
    color: '#071c47',
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Add bottom padding so content isn't hidden behind buttons
  },
});
