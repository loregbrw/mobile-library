import React, { useEffect, useState } from 'react';
import { useRoute, RouteProp } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from "react-native";
import { RootStackParamList } from "../App";
import { BooksService } from '../services/booksService';

type BookDetailsRouteProp = RouteProp<RootStackParamList, 'BookDetails'>;

const BookDetails = () => {
    const route = useRoute<BookDetailsRouteProp>();
    const { book } = route.params;

    const [description, setDescription] = useState<string>('');
    const [loadingDesc, setLoadingDesc] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const details = await BooksService.getBookDetails(book.key);
                if (details.description) {
                    const descText = typeof details.description === 'string' 
                        ? details.description 
                        : details.description.value;
                    setDescription(descText);
                } else {
                    setDescription("Nenhuma descrição disponível para este livro.");
                }
            } catch (error) {
                console.error("Erro ao buscar detalhes", error);
                setDescription("Falha ao carregar a sinopse.");
            } finally {
                setLoadingDesc(false);
            }
        };

        fetchDetails();
    }, [book.key]);

    const coverUrl = book.cover_i 
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";

    return (
        <ScrollView style={styles.container}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Image style={styles.image} source={{ uri: coverUrl }} />
            </View>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.text}>Autor: {book.author_name?.join(", ") ?? "Desconhecido"}</Text>
            <Text style={styles.text}>Ano de publicação: {book.first_publish_year ?? "N/A"}</Text>
            
            <Text style={styles.descriptionTitle}>Descrição</Text>
            {loadingDesc ? (
                <ActivityIndicator size="small" color="#496b92" style={{marginTop: 10}} />
            ) : (
                <Text style={styles.description}>{description}</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#fff"
    },
    image: {
        width: 160,
        height: 240,
        borderRadius: 5,
        marginBottom: 15
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        marginBottom: 10,
        color: '#333' },
    text: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5
    },
    descriptionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#333' },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        textAlign: 'justify',
        paddingBottom: 40
    }
});

export default BookDetails;