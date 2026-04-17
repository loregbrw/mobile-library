import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

import Card from './components/Card';
import Header from './components/Header';

// https://www.kaggle.com/datasets/diegomariano/tabela-de-livros?select=livros.json
import Books from './data/books.json'
import BookImg from './assets/book.png';

export default function App() {
    return (
        <View style={styles.global}>
            <Header image={BookImg} title={'Biblioteca'} />
            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.container}>
                    {
                        Books.map((book, i) => (
                            <Card key={i} title={book.titulo} description={`${book.autor}, ${book.ano}`} info={`${book.paginas} páginas`} />
                        ))
                    }
                    <Text>Lorena Gobara Falci, XGH</Text>
                    <StatusBar style="auto" />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    global: {
        flex: 1,
    },
    scrollViewContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
        padding: 15,
        gap: 15,
        backgroundColor: '#f5f5f5',
        paddingBottom: 50
    },
});
