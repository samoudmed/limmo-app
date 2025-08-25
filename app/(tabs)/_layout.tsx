import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabsLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#071c47',
          paddingBottom: 6, // 👈 Petit padding en bas
          height: 60,        // Facultatif : ajuste la hauteur si besoin
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#aaa',
        tabBarLabelPosition: 'below-icon', // ⬅️ Important pour le titre en dessous
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          if (route.name === 'home') iconName = 'home-outline';
          else if (route.name === 'search') iconName = 'search-outline';
          else if (route.name === 'deposer-annonce') iconName = 'add-circle-outline';
          else if (route.name === 'account') iconName = 'person-circle-outline';

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Accueil' }} />
      <Tabs.Screen name="search" options={{ title: 'Recherche' }} />
      <Tabs.Screen name="deposer-annonce" options={{ title: 'Déposer' }} />
      <Tabs.Screen name="account" options={{ title: 'Compte' }} />
    </Tabs>
    </SafeAreaView>
  );
}
