import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

import React from 'react';

interface ILibrary {
    id: string;
    nome: string;
    description: string;
    latitude: number;
    longitude: number;
};

const libraries: ILibrary[] = [
    {
        id: '1',
        nome: 'Biblioteca Central',
        description: 'Grande acervo de livros.',
        latitude: -25.4284,
        longitude: -49.2733,
    },
    {
        id: '2',
        nome: 'Biblioteca Municipal',
        description: 'Biblioteca pública da cidade.',
        latitude: -25.4411,
        longitude: -49.2329,
    },
    {
        id: '3',
        nome: 'Biblioteca Universitária',
        description: 'Biblioteca acadêmica.',
        latitude: -25.3934,
        longitude: -49.2608,
    },
];

const MapScreen = () => {

    const initialRegion = {
        latitude: -25.4284,
        longitude: -49.2733,
        latitudeDelta: 0.15,
        longitudeDelta: 0.15,
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={initialRegion}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                {libraries.map((library) => (
                    <Marker
                        key={library.id}
                        coordinate={{
                            latitude: library.latitude,
                            longitude: library.longitude,
                        }}
                        title={library.nome}
                        description={library.description}
                    >
                        <Callout>
                            <View style={styles.calloutContainer}>
                                <Text style={styles.calloutTitle}>{library.nome}</Text>
                                <Text style={styles.calloutDescription}>
                                    {library.description}
                                </Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: {
        width: '100%',
        height: '100%',
    },
    calloutContainer: {
        width: 150,
        padding: 5,
    },
    calloutTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    calloutDescription: {
        fontSize: 12,
        color: '#666',
    },
    calloutLink: {
        fontSize: 12,
        color: 'blue',
        marginTop: 5,
        textAlign: 'right',
    }
});


export default MapScreen;