import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';

import Button from '../components/Button';
import BookImg from '../assets/book.png';

const LoginScreen = () => {

    const [username, setUsername] = useState('');
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!username.trim()) return;
        await login(username);
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={BookImg} />
                <View style={styles.header}>
                    <Text style={styles.title}>Guia de Livros e Bibliotecas</Text>
                    <Text>Bem vindo ao XGH.</Text>
                </View>
                <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
                <Button title="Login" onClick={handleLogin} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#f5f5f5"
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 3,
        padding: 10,
        alignItems: "center",
        gap: 5
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25
    },
    input: {
        borderWidth: 2,
        padding: 2,
        width: 280,
        borderRadius: 3
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default LoginScreen;