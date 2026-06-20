import React, { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, } from 'react-native';

import Header from '../components/Header';
import Book from '../components/Book';
import Button from '../components/Button';
import BookImg from '../assets/book.png';

const PAGE_SIZE = 20;

const FavoritesScreen = () => {

    const { favoriteBooks, isLoadingFavorites, } = useFavorites();

    const [page, setPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(favoriteBooks.length / PAGE_SIZE));

    const paginatedBooks = favoriteBooks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const goToPreviousPage = () => {
        setPage(current =>
            Math.max(current - 1, 1)
        );
    };

    const goToNextPage = () => {
        setPage(current =>
            Math.min(current + 1, totalPages)
        );
    };

    if (isLoadingFavorites) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator
                    size="large"
                    color="#2b2b2b"
                />
            </View>
        );
    }

    return (
        <View style={styles.global}>
            <Header />

            <View style={styles.container}>
                {
                    favoriteBooks.length === 0
                        ? (
                            <View style={styles.empty}>
                                <Text style={styles.emptyText}>Nenhum livro favoritado.</Text>
                            </View>
                        )
                        : (
                            <>
                                <ScrollView style={styles.books} contentContainerStyle={styles.booksContent}>
                                    {
                                        paginatedBooks.map(book => (
                                            <Book
                                                key={book.id}
                                                volume={{
                                                    id: book.id,
                                                    volumeInfo: {
                                                        title: book.title,
                                                        authors: book.authors,
                                                        imageLinks: {
                                                            thumbnail:
                                                                book.thumbnail,
                                                        },
                                                    },
                                                } as any}
                                            />
                                        ))
                                    }
                                </ScrollView>

                                <View style={styles.pagination}>
                                    <Button
                                        title="Anterior"
                                        onClick={goToPreviousPage}
                                        disabled={page === 1}
                                    />

                                    <Text style={styles.pageText}>Página {page} de {totalPages}</Text>

                                    <Button
                                        title="Próxima"
                                        onClick={goToNextPage}
                                        disabled={page >= totalPages}
                                    />
                                </View>
                            </>
                        )
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    global: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
        padding: 15,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        paddingTop: 10,
    },
    pageText: {
        fontWeight: '600',
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
    },
});

export default FavoritesScreen;