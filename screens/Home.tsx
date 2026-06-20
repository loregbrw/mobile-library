import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

import Header from '../components/Header';
import BookImg from '../assets/book.png';
import Input from '../components/Input';
import Book from '../components/Book';
import Button from '../components/Button';

import { IOpenLibraryBook } from '../types'; 
import { BooksService } from '../services/booksService';

const Home = () => {
    const [books, setBooks] = useState<IOpenLibraryBook[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchText, setSearchText] = useState('');

    const search = (value: string) => {
        setSearchText(value);
        setPage(1);
    }

    const goToNextPage = () => setPage(p => p + 1);
    const goToPreviousPage = () => setPage(p => p - 1);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setIsLoading(true);
                const response = await BooksService.getBooks({
                    page,
                    pageSize: 40,
                    query: searchText
                });
                
                setBooks(response.items);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error("Erro ao carregar livros:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, [page, searchText]);

    return (
        <View style={styles.global}>
            <Header title="Biblioteca" image={BookImg} />

            <View style={styles.container}>
                <View style={styles.options}>
                    <Input 
                        title="Buscar Livro" 
                        placeholder="Digite o título ou nome do autor..." 
                        button="Procurar" 
                        onSearch={search} 
                    />
                </View>

                <ScrollView 
                    style={styles.books} 
                    contentContainerStyle={styles.booksContent}
                    persistentScrollbar={true}
                >
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#496b92" style={{ marginTop: 50 }} />
                    ) : (
                        books.map((item, index) => (
                            <Book key={index} book={item} /> 
                        ))
                    )}
                </ScrollView>
                
                <View style={styles.pagination}>
                    <Button title="Anterior" onClick={goToPreviousPage} disabled={page === 1 || isLoading} />

                    <Text style={styles.pageText}>
                        Página {page} de {totalPages}
                    </Text>

                    <Button title="Próxima" onClick={goToNextPage} disabled={page >= totalPages || isLoading} />
                </View>
                <StatusBar style="auto" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    global: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    container: {
        flex: 1,
        padding: 15
    },
    options: {
        gap: 15,                
        backgroundColor: '#f5f5f5',
        paddingBottom: 20,
        paddingTop: 5         
    },
    books: {
        flex: 1
    },
    booksContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20
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
        color: '#636e72',    
        fontWeight: '700',
    },
});

export default Home;