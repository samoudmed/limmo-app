import { StyleSheet, Text, View } from 'react-native';

export default function Favorites() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes favoris</Text>
      <Text style={styles.text}>Vous n’avez encore ajouté aucun favori.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#071c47',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
});
