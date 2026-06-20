import { View, Text, StyleSheet } from 'react-native';

const MapScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mapa não disponível na Web.</Text>
            <Text>Para acessar essa página é necessário um dispositivo Android ou IOS.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e6ffe6' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default MapScreen;