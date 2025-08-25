import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet, Text, View } from 'react-native';

export default function profile() {
    const navigation = useNavigation();

    const handleLogout = async () => {
        await AsyncStorage.clear();
        Alert.alert('Déconnexion', 'Vous avez été déconnecté.');
        navigation.reset({
            index: 0,
            routes: [{ name: 'account' }],
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mon profil</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#071c47',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#ff3b30',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
