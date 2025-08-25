import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { properties } from '@/constants/data';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams();
  const property = properties.find((p) => p.id === id);
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: '100%',
      height: 300,
    },
    infoContainer: {
      padding: 24,
      backgroundColor: 'transparent',
    },
    price: {
      marginTop: 16,
      fontSize: 24,
      color: Colors.light.tint,
    },
    address: {
      marginTop: 8,
      fontSize: 18,
      color: Colors[colorScheme ?? 'light'].tabIconDefault,
    },
  });

  if (!property) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText type="title">Property not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <Stack.Screen options={{ title: '', headerBackTitle: 'Map' }} />
      <ThemedView style={styles.container}>
        <Image
          source={{ uri: property.image }}
          style={styles.image}
          placeholder={require('@/assets/images/splash-icon.png')}
          contentFit="cover"
          transition={300}
        />
        <ThemedView style={styles.infoContainer}>
          <ThemedText type="title">{property.title}</ThemedText>
          <ThemedText style={styles.address}>{property.address}</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.price}>{property.price}</ThemedText>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}
