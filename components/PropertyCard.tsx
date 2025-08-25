import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Property } from '@/constants/data';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    card: {
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 24,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
    },
    image: {
      width: '100%',
      height: 220,
    },
    infoContainer: {
      padding: 16,
      backgroundColor: 'transparent',
    },
    price: {
      marginTop: 8,
      fontSize: 18,
      color: Colors.light.tint,
    },
    address: {
      marginTop: 4,
      color: Colors[colorScheme ?? 'light'].tabIconDefault,
    },
  });

  return (
    <ThemedView style={styles.card}>
      <Image
        source={{ uri: property.image }}
        style={styles.image}
        placeholder={require('@/assets/images/splash-icon.png')}
        contentFit="cover"
        transition={300}
      />
      <ThemedView style={styles.infoContainer}>
        <ThemedText type="subtitle">{property.title}</ThemedText>
        <ThemedText style={styles.address}>{property.address}</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.price}>{property.price}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
