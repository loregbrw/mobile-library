import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { BooksService } from '../services/booksService';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';

import Card from '../components/Card';
import Header from '../components/Header';

// https://www.kaggle.com/datasets/diegomariano/tabela-de-livros?select=livros.json
import Books from '../data/books.json'
import BookImg from '../assets/book.png';
import Input from '../components/Input';
import Select from '../components/Select';
import { EBookGenre } from '../types';
import { BookGenreLabels } from '../constants/book';

const Home = () => {

    const genreOptions = Object.values(EBookGenre).map(genre => ({
        label: BookGenreLabels[genre],
        value: genre,
    }));

    const [genre, setGenre] = useState<EBookGenre>(
        EBookGenre.Fantasy
    );

    const search = () => {

    }

    return (
        <View style={styles.global}>
            <Header image={BookImg} title={"Biblioteca LGF."} />
            <View style={styles.options}>
                <Input title="Pesquise um livro ou autor" button="Pesquisar" onSearch={search} />
                <Select title={"Selecione um gênero:"} options={genreOptions} value={genre} onChange={value => setGenre(value as EBookGenre)} />
            </View>
            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.container}>
                    {
                        Books.map((book, i) => (
                            <Card key={i} index={i} title={book.titulo} description={`${book.autor}, ${book.ano}`} info={`${book.paginas} páginas`} />
                        ))
                    }
                    <StatusBar style="auto" />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    global: {
        flex: 1,
    },
    options: {
        gap: 5,
        backgroundColor: '#f5f5f5',
        padding: 15,
    },
    scrollViewContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        padding: 15,
        gap: 15,
        backgroundColor: '#f5f5f5',
        paddingBottom: 50
    },
});

export default Home;