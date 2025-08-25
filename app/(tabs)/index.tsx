import { FlatList, Pressable, StyleSheet } from 'react-native';
import { PropertyCard } from '@/components/PropertyCard';
import { properties, Property } from '@/constants/data';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: Property }) => (
    <Pressable onPress={() => router.push(`/(property)/${item.id}`)}>
      <PropertyCard property={item} />
    </Pressable>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Properties for Sale</ThemedText>
          <ThemedText type="subtitle">Find your dream home</ThemedText>
        </ThemedView>
        <FlatList
          data={properties}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  list: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
