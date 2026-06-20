import { StatusBar } from 'expo-status-bar';
import { BooksService } from '../services/booksService';
import { BookGenreLabels } from '../constants/book';
import { useEffect, useState } from 'react';
import { EBookGenre, IVolume } from '../types';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import Book from '../components/Book';
import Input from '../components/Input';
import Button from '../components/Button';
import Select from '../components/Select';
import Header from '../components/Header';
import BookImg from '../assets/book.png';

const Home = () => {

    const [books, setBooks] = useState<IVolume[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchText, setSearchText] = useState('');

    const genreOptions = Object.values(EBookGenre).map(genre => ({
        label: BookGenreLabels[genre],
        value: genre,
    }));

    const [genre, setGenre] = useState<EBookGenre>(EBookGenre.Fantasy);

    const search = (value: string) => {
        setSearchText(value);
        setPage(1);
    }

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setIsLoading(true);
                const response = await BooksService.getBooks({
                    genre,
                    page,
                    pageSize: 40,
                    query: searchText,
                });
                setBooks(response.items ?? []);
                setTotalPages(response.totalPages || 1);
            } catch (err) {
                console.error('Erro ao buscar livros:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, [genre, page, searchText]);

    const handleGenreChange = (value: string) => {
        setGenre(value as EBookGenre);
        setPage(1);
    };

    const goToPreviousPage = () => {
        setPage(currentPage => Math.max(currentPage - 1, 1));
    };

    const goToNextPage = () => {
        setPage(currentPage => Math.min(currentPage + 1, totalPages));
    };

    return (
        <View style={styles.global}>
            <Header image={BookImg} title={"Livros XGH."} />
            <View style={styles.container}>
                <View style={styles.options}>
                    <Input title="Pesquise um livro ou autor" placeholder="Digite um livro ou autor..." button="Pesquisar" onSearch={search} />
                    <Select title={"Selecione um gênero:"} options={genreOptions} value={genre} onChange={handleGenreChange} />
                </View>

                {
                    isLoading
                        ? <ActivityIndicator size="large" color="#2b2b2b" />
                        :
                        (
                            !books
                                ? <Text>AAA</Text>
                                :
                                <ScrollView
                                    style={styles.books}
                                    contentContainerStyle={styles.booksContent}
                                    persistentScrollbar={true}
                                >
                                    {books.map((item, index) => (
                                        <Book key={index} volume={item} />
                                    ))}
                                </ScrollView>

                        )
                }
                <View style={styles.pagination}>
                    <Button title="Anterior" onClick={goToPreviousPage} disabled={page === 1} />

                    <Text style={styles.pageText}>
                        Página {page} de {totalPages}
                    </Text>

                    <Button title="Próxima" onClick={goToNextPage} disabled={page >= totalPages} />
                </View>
                <StatusBar style="auto" />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    global: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
        padding: 15
    },
    options: {
        gap: 5,
        backgroundColor: '#f5f5f5',
        paddingBottom: 10,
    },
    books: {
        flex: 1,
    },
    booksContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
    },
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: '#f5f5f5',
        paddingTop: 10
    },
    pageText: {
        color: '#2b2b2b',
        fontWeight: '600',
    },
});

export default Home;
