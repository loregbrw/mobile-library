import { View, StyleSheet, Text, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';

import React from 'react';
import Input from '../components/Input';
import BookImg from '../assets/book.png';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {

    const { login } = useAuth();

    const handleLogin = async (name: string) => {
        if (!name) {
            Toast.show({
                type: "error",
                text1: "Campo obrigatório!",
                text2: "É necessário informar o nome completo para logar na plataforma."
            });
            return;
        }

        await login(name);
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={BookImg} />
                <View style={styles.header}>
                    <Text style={styles.title}>Guia de Livros e Bibliotecas</Text>
                    <Text>Bem vindo ao XGH.</Text>
                </View>
                <Input title="Nome completo" button="Logar" onSearch={handleLogin} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#f5f5f5"
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 3,
        padding: 20,
        alignItems: "center",
        margin: 15,
        marginTop: 150
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