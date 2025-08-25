import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const types = ['Tous', 'Appartement', 'Maison', 'Studio', 'Villa'];
const villes = ['Toutes', 'Paris', 'Lyon', 'Marseille', 'Nice'];
const actions = ['Tous', 'Vente', 'Location'];
const API_URL = process.env.EXPO_PUBLIC_API_URL;

function Select({ label, options, selected, onSelect }) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.selectContainer}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.selectText}>{selected}</Text>
            </TouchableOpacity>

            <Modal
                transparent
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <ScrollView>
                            {options.map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        styles.option,
                                        option === selected && styles.optionSelected,
                                    ]}
                                    onPress={() => {
                                        onSelect(option);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            option === selected && styles.optionTextSelected,
                                        ]}
                                    >
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}

export default function Home() {
    const [selectedType, setSelectedType] = useState('Tous');
    const [selectedVille, setSelectedVille] = useState('Toutes');
    const [selectedAction, setSelectedAction] = useState('Tous');

    // Temporary states for modal selections
    const [tempType, setTempType] = useState(selectedType);
    const [tempVille, setTempVille] = useState(selectedVille);
    const [tempAction, setTempAction] = useState(selectedAction);

    const [properties, setProperties] = useState<any[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    const screenWidth = Dimensions.get('window').width;

    useEffect(() => {
        fetch("http://localhost:8080/api/properties")
            .then((res) => res.json())
            .then((data) => {
                setProperties(data);
                setFilteredProperties(data); // Initially show all
            });
    }, []);

    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' DT';
    };

    // Filtering logic applied when user clicks Save in modal
    const applyFilters = () => {
        let filtered = properties;

        if (tempType !== 'Tous') {
            filtered = filtered.filter(p => p.type === tempType);
        }
        if (tempVille !== 'Toutes') {
            filtered = filtered.filter(p => p.city === tempVille);
        }
        if (tempAction !== 'Tous') {
            filtered = filtered.filter(p => p.action === tempAction);
        }

        setSelectedType(tempType);
        setSelectedVille(tempVille);
        setSelectedAction(tempAction);
        setFilteredProperties(filtered);
        setFilterModalVisible(false);
    };

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
                    {item.agence && (
                        <Image source={{ uri: `https://limmobilier.tn/uploads/logos/${item.agence}` }} style={styles.agencyLogo} />
                    )}
                </View>
            </TouchableOpacity>
        </Link>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredProperties}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={1}
                showsVerticalScrollIndicator={false}
            />

            <Modal
                visible={filterModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setFilterModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.filterModalContent}>
                        <Text style={styles.modalTitle}>Filtres</Text>
                        <Select label="Type" options={types} selected={tempType} onSelect={setTempType} />
                        <Select label="Ville" options={villes} selected={tempVille} onSelect={setTempVille} />
                        <Select label="Action" options={actions} selected={tempAction} onSelect={setTempAction} />

                        <TouchableOpacity style={styles.saveButton} onPress={applyFilters}>
                            <Text style={styles.saveButtonText}>Enregistrer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setFilterModalVisible(false)}
                        >
                            <Text style={styles.cancelButtonText}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
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
