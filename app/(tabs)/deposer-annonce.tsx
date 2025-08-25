import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const actions = ['Vente', 'Location'];
const types = ['Maison', 'Appartement', 'Studio', 'Villa'];

export default function DeposerAnnonce() {
  const gouvernorats = [
    { label: 'Tunis', value: 'tunis' },
    { label: 'Sfax', value: 'sfax' },
    { label: 'Sousse', value: 'sousse' },
    { label: 'Nabeul', value: 'nabeul' },
    { label: 'Gabès', value: 'gabes' },
    // Add more gouvernorats as needed
  ];

  const [step, setStep] = useState(1);

  // Form state
  const [action, setAction] = useState('');
  const [typeBien, setTypeBien] = useState('');
  const [gouvernorat, setGouvernorat] = useState('');
  const [delegations, setDelegations] = useState([]);
  const [delegation, setDelegation] = useState('');
  const [villes, setVilles] = useState([]);
  const [ville, setVille] = useState('');
  // Simuler appel API pour récupérer délégations selon gouvernorat
  const fetchDelegations = async (gov) => {
    try {
      // Remplace ici par ton appel réel API
      const res = await fetch(`${API_URL}/api/delegations/${gov}`);
      const data = await res.json();

      setDelegations(data);
      setDelegation(''); // Reset sélection délégation
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les délégations');
    }
  };

  const fetchVilles = async (del) => {
    try {
      // Remplace ici par ton appel réel API
      const res = await fetch(`http://localhost:8080/api/villes/${del}`);
      const data = await res.json();

      setVilles(data);
      setVille(''); // Reset sélection villes
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les villes');
    }
  };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [surface, setSurface] = useState('');
  const [pieces, setPieces] = useState('');
  const [photos, setPhotos] = useState([]);

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission refusée pour accéder aux photos');
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Vérifie ta version d'expo pour la compatibilité
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos((prev) => [...prev, ...result.assets.map((asset) => asset.uri)]);
    }
  };

  const nextStep = () => {
    if (step === 1 && (!action || !typeBien)) {
      Alert.alert('Erreur', 'Veuillez choisir l’action et le type de bien.');
      return;
    }
    if (step === 2 && (!gouvernorat || !delegation)) {
      Alert.alert('Erreur', 'Veuillez remplir le titre et la description.');
      return;
    }
    if (step === 3 && (!title || !description)) {
      Alert.alert('Erreur', 'Veuillez remplir le titre et la description.');
      return;
    }
    if (step === 4 && (!prix || !surface || !pieces)) {
      Alert.alert('Erreur', 'Veuillez remplir tous les détails.');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem('userId');
      setUserId(id);
    };
    getUserId();
  }, []);

  const submitForm = async () => {
    const expiredAt = 30;
    //Alert.alert('Succès', 'Annonce déposée avec succès !');
    //setStep(1);
    //setAction('');
    //setTypeBien('');
    //setGouvernorat('');
    //setTitle('');
    //setDescription('');
    //setPrix('');
    //setSurface('');
    //setPieces('');
    //setPhotos([]);

    try {
          const response = await fetch('http://localhost:8080/api/deposer-annonce', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title,
              action,
              typeBien,
              description,
              photos,
              expiredAt,
              gouvernorat,
              delegation,
              ville,
              userId,
            }),
          });
    
          if (response.ok) {
            Alert.alert('Votre Annonce a été ajoutée avec succès!');
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
        };
  };

  const SelectButton = ({ options, selected, onSelect }) => (
    <View style={styles.selectContainer}>
      {options.map((opt) => (
        <TouchableOpacity
          key={opt}
          style={[
            styles.selectButton,
            selected === opt && styles.selectButtonSelected,
          ]}
          onPress={() => onSelect(opt)}
        >
          <Text
            style={[
              styles.selectText,
              selected === opt && styles.selectTextSelected,
            ]}
          >
            {opt}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  useEffect(() => {
    if (gouvernorat) {
      fetchDelegations(gouvernorat);
    } else {
      setDelegations([]);
      setDelegation('');
    }
  }, [gouvernorat]);
  useEffect(() => {
    if (delegation) {
      fetchVilles(delegation);
    } else {
      setVilles([]);
      setVille('');
    }
  }, [delegation]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Déposer une annonce</Text>

      {step === 1 && (
        <>
          <Text style={styles.label}>Type d’action</Text>
          <SelectButton options={actions} selected={action} onSelect={setAction} />

          <Text style={styles.label}>Type de bien</Text>
          <SelectButton options={types} selected={typeBien} onSelect={setTypeBien} />
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.label}>Gouvernorat</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gouvernorat}
              onValueChange={(itemValue) => setGouvernorat(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="-- Sélectionner Gouvernorat --" value="" />
              {gouvernorats.map((gov) => (
                <Picker.Item key={gov.value} label={gov.label} value={gov.value} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Délégation</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={delegation}
              enabled={delegations.length > 0}
              onValueChange={(itemValue) => setDelegation(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label={delegations.length > 0 ? "-- Sélectionner Délégation --" : "Choisissez un gouvernorat d'abord"} value="" />
              {delegations.map((del) => (
                <Picker.Item key={del.value} label={del.label} value={del.value} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Villes</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={ville}
              enabled={villes.length > 0}
              onValueChange={(itemValue) => setVille(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label={villes.length > 0 ? "-- Sélectionner une ville --" : "Choisissez une délégation d'abord"} value="" />
              {villes.map((vil) => (
                <Picker.Item key={vil.value} label={vil.label} value={vil.value} />
              ))}
            </Picker>
          </View>
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.label}>Titre</Text>
          <TextInput
            style={styles.input}
            placeholder="Titre de l'annonce"
            value={title}
            onChangeText={setTitle}
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Description détaillée"
            value={description}
            multiline
            onChangeText={setDescription}
          />
        </>
      )}

      {step === 4 && (
        <>
          <Text style={styles.label}>Prix (DT)</Text>
          <TextInput
            style={styles.input}
            placeholder="Prix"
            keyboardType="numeric"
            value={prix}
            onChangeText={setPrix}
          />
          <Text style={styles.label}>Surface (m²)</Text>
          <TextInput
            style={styles.input}
            placeholder="Surface"
            keyboardType="numeric"
            value={surface}
            onChangeText={setSurface}
          />
          <Text style={styles.label}>Nombre de pièces</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre de pièces"
            keyboardType="numeric"
            value={pieces}
            onChangeText={setPieces}
          />
        </>
      )}

      {step === 5 && (
        <>
          <Text style={styles.label}>Photos</Text>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Ajouter des photos</Text>
          </TouchableOpacity>

          {photos.length > 0 && (
            <ScrollView horizontal style={{ marginTop: 10 }}>
              {photos.map((uri, index) => (
                <Image
                  key={index}
                  source={{ uri }}
                  style={{ width: 100, height: 100, marginRight: 8 }}
                />
              ))}
            </ScrollView>
          )}
        </>
      )}

      <View style={styles.navigation}>
        {step > 1 && (
          <TouchableOpacity style={styles.navButton} onPress={prevStep}>
            <Text style={styles.navButtonText}>Précédent</Text>
          </TouchableOpacity>
        )}
        {step < 5 ? (
          <TouchableOpacity style={styles.navButton} onPress={nextStep}>
            <Text style={styles.navButtonText}>Suivant</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
            <Text style={styles.submitButtonText}>Envoyer</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    color: '#071c47',
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 16,
    color: '#333',
  },
  selectContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  selectButton: {
    borderWidth: 1,
    borderColor: '#071c47',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#f0f4f8',
  },
  selectButtonSelected: {
    backgroundColor: '#071c47',
  },
  selectText: {
    color: '#071c47',
    fontWeight: '500',
  },
  selectTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: '#071c47',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    backgroundColor: '#eee',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#071c47',
    fontWeight: '600',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#071c47',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#071c47',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#071c47',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
