import { useRoute, RouteProp } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";

import Books from '../data/books.json';

import { RootStackParamList } from "../App";

type BookDetailsRouteProp = RouteProp<
    RootStackParamList,
    'BookDetails'
>;

const BookDetails = () => {

    const route = useRoute<BookDetailsRouteProp>();
    const { index } = route.params;

    const book = Books[index];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{book.titulo}</Text>
            <Text style={styles.text}>Autor: {book.autor}</Text>
            <Text style={styles.text}>Ano: {book.ano}</Text>
            <Text style={styles.text}>Páginas: {book.paginas}</Text>
            <Text style={styles.footer}>isbn: {book.isbn}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        gap: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        marginBottom: 5,
        color: '#333',
    },
    text: {
        fontSize: 20,
        color: '#333',
    },
    footer: {
        fontSize: 14,
        color: '#666',
    }
});

export default BookDetails;