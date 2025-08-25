import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function MyAds() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setAds(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur API:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Text>Chargement...</Text>;

  const renderItem = ({ item }: any) => (
    <Link href={`/property/${item.id}`} asChild>
      <TouchableOpacity style={{ marginRight: 12 }}>
        <View style={styles.card}>
          <Image
            source={{
              uri: `https://limmobilier.tn/uploads/photos/263x175/webp/${item.image}.webp`,
            }}
            style={styles.image}
          />
          <View style={styles.info}>
            <Text style={styles.type}>{item.title}</Text>
            {item.price != null && (
              <Text style={styles.price}>{formatPrice(item.price)}</Text>
            )}

            <Text style={styles.details}>
              {item.rooms && `${item.rooms} pièces`}
              {item.rooms && item.surface && ' • '}
              {item.surface && `${item.surface} m²`}
            </Text>
            <Text style={styles.city}>{item.city}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Annonces</Text>
      <FlatList
        data={ads}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={1}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  adBox: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8
  },
  adTitle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    position: 'relative',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  info: {
    padding: 10,
    height: 120,
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    color: '#28a745',
    fontWeight: 'bold',
  },
  type: {
    height: 100,
    fontSize: 14,
    fontWeight: '600',
    color: '#071c47',
    paddingBottom: 5,
  },
  details: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  city: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  agencyLogo: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  selectContainer: {
    flex: 1,
    marginVertical: 10,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    color: '#444',
  },
  selectButton: {
    borderWidth: 1,
    borderColor: '#071c47',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f0f4f8',
  },
  selectText: {
    color: '#071c47',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  filterModalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: '#071c47',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#071c47',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#071c47',
  },
  cancelButtonText: {
    color: '#071c47',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: '#071c47',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
