import { Link, Stack } from 'expo-router';
import { Image, TouchableOpacity } from 'react-native';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#071c47',
        },
        headerTitle: () => (
          <Link href="/(tabs)/home" asChild>
            <TouchableOpacity>
              <Image
                source={require('../assets/images/logo.png')}
                style={{ width: 180, height: 40, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          </Link>
        ),
        headerTintColor: '#fff',
      }}
    />
  );
}
