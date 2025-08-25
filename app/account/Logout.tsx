import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Alert } from 'react-native';

const Logout = () => {
  const router = useRouter(); // ✅ Utiliser useRouter

  useEffect(() => {
    const logout = async () => {
      try {
        await AsyncStorage.removeItem('userId');
        router.replace('/home'); // ✅ Redirige vers l'accueil
      } catch (error) {
        Alert.alert('Erreur', "Échec de la déconnexion.");
      }
    };

    logout();
  }, []);

  return null;
};

export default Logout;

