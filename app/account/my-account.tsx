import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const unstable_settings = {
  href: null,
};

const MyAccountScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const id = await AsyncStorage.getItem('userId');
      if (!id) {
        navigation.replace('login'); // redirige vers la page login si non connecté
      } else {
        setUserId(id);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const items = [
    { label: 'Mes annonces', icon: 'list', screen: 'account/my-ads' },
    { label: 'Mes favoris', icon: 'heart', screen: 'account/Favorites' },
    { label: 'Mon profil', icon: 'user', screen: 'account/profile' },
    { label: 'Déconnexion', icon: 'sign-out', screen: 'account/Logout' },
  ];

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1fc341" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mon Compte</Text>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Icon name={item.icon} size={22} color="#4a4a4a" style={styles.icon} />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default MyAccountScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  icon: {
    marginRight: 15,
  },
  label: {
    fontSize: 18,
    color: '#333',
  },
});
