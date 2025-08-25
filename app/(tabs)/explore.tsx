import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { ThemedView } from '@/components/ThemedView';
import { properties } from '@/constants/data';
import { useRouter } from 'expo-router';

export default function ExploreScreen() {
  const router = useRouter();

  const onMarkerPress = (id: string) => {
    router.push(`/(property)/${id}`);
  };

  return (
    <ThemedView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 34.052235,
          longitude: -118.243683,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {properties.map((property) => (
          <Marker
            key={property.id}
            coordinate={{
              latitude: property.latitude,
              longitude: property.longitude,
            }}
            title={property.title}
            description={property.address}
            onPress={() => onMarkerPress(property.id)}
          />
        ))}
      </MapView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
