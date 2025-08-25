import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RenderHTML from 'react-native-render-html';
import ContactForm from '../src/components/ContactForm';
import PropertyCarousel from '../src/components/PropertyCarousel';
const { width } = Dimensions.get('window');

export default function PropertyDetail() {
    const { id } = useLocalSearchParams();
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const handleCall = () => {
        if (property.agencyPhone) {
            Linking.openURL(`tel:${property.agencyPhone}`);
        } else {
            alert('Numéro non disponible');
        }
    };

    const handleContact = () => {
        // Par exemple, ouvrir un formulaire contact ou naviguer vers une autre page
        alert('Ouvrir formulaire de contact');
    };
    useEffect(() => {
        fetch(`http://localhost:8080/api/property/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProperty(data);
                setLoading(false);
            });
    }, [id]);

    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' DT';
    };

    if (loading) {
        return <ActivityIndicator style={{ marginTop: 50 }} />;
    }

    if (!property) {
        return <Text style={{ marginTop: 50, textAlign: 'center' }}>Aucune annonce trouvée</Text>;
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>{property.title}</Text>
                {/* Carousel */}
                {property.photos?.length > 0 && (
                    <PropertyCarousel photos={property.photos} />
                )}

                <View style={styles.info}>

                    {property.price != null && (
                        <Text style={styles.price}>{formatPrice(property.price)}</Text>
                    )}
                    <Text style={styles.detail}>
                        {property.rooms} pièces • {property.surface} m²
                    </Text>
                    <Text style={styles.city}>{property.city}</Text>

                    {property.agence && (
                        <Image source={{ uri: `https://limmobilier.tn/uploads/logos/${property.agence}` }} style={styles.agencyLogo} />
                    )}

                    <RenderHTML
                        contentWidth={width}
                        source={{ html: property.description }}
                    />
                    <ContactForm phoneNumber={property.agencyPhone} listingId={property.id} />
                </View>
            </ScrollView>
            <View style={styles.fixedButtons}>
                <TouchableOpacity style={styles.button} onPress={handleCall}>
                    <Text style={styles.buttonText}>📞 Appeler</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, { marginLeft: 10 }]} onPress={handleContact}>
                    <Text style={styles.buttonText}>✉️ Contacter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width,
        height: 250,
    },
    info: {
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#071c47',
        padding: 5,
    },
    price: {
        fontSize: 20,
        color: '#28a745',
        fontWeight: 'bold',
        marginTop: 8,
    },
    detail: {
        fontSize: 16,
        color: '#555',
        marginVertical: 8,
    },
    city: {
        fontSize: 16,
        color: '#888',
    },
    description: {
        marginTop: 12,
        fontSize: 15,
        lineHeight: 22,
        color: '#333',
    },
    agencyLogo: {
        marginTop: 20,
        width: 80,
        height: 30,
        resizeMode: 'contain',
        alignSelf: 'flex-end',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100, // Add bottom padding so content isn't hidden behind buttons
    },
    fixedButtons: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 12,
        //backgroundColor: 'rgba(7, 28, 71, 0.95)', // semi-transparent dark background
        //shadowColor: '#000',
        //shadowOffset: { width: 0, height: -2 },
        //shadowOpacity: 0.3,
        //shadowRadius: 4,
        elevation: 10,
    },
    button: {
        flex: 1,
        backgroundColor: '#0a5cf5',
        marginHorizontal: 5,
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
