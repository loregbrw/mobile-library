import { IVolume } from "../types";
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewsContext';
import { BooksService } from "../services/booksService";
import { useFavorites } from '../context/FavoritesContext';
import { RootStackParamList } from "../components/MainTabs";
import { useRoute, RouteProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, ActivityIndicator, Modal, Text, ScrollView, TouchableOpacity, useWindowDimensions, TextInput } from "react-native";

import Header from "../components/Header";
import BookImg from '../assets/book.png';
import RenderHTML from 'react-native-render-html';
import Button from "../components/Button";
import Toast from "react-native-toast-message";

type BookDetailsRouteProp = RouteProp<
    RootStackParamList,
    'BookDetails'
>;

const BookDetails = () => {

    const [volume, setVolume] = useState<IVolume>();
    const [isLoading, setIsLoading] = useState(true);

    const route = useRoute<BookDetailsRouteProp>();
    const { id } = route.params;

    const { user } = useAuth();
    const { getReviewsByBook, addReview, updateReview, deleteReview, } = useReviews();

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(5);

    const { isFavorite, toggleFavorite } = useFavorites();

    const handleToggleFavorite = () => {
        if (volume?.id) toggleFavorite(volume);
    };

    const isFav = volume?.id ? isFavorite(volume.id) : false;

    const favoriteIconName = isFav ? 'heart' : 'heart-outline';
    const favoriteIconColor = isFav ? 'red' : 'gray';

    const reviews = volume
        ? getReviewsByBook(volume.id).sort((a, b) => {
            const aIsCurrentUser = a.userId === user?.id;
            const bIsCurrentUser = b.userId === user?.id;

            if (aIsCurrentUser && !bIsCurrentUser)
                return -1;

            if (!aIsCurrentUser && bIsCurrentUser)
                return 1;

            return (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        })
        : [];

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setIsLoading(true);
                const response = await BooksService.getBookById(id);
                setVolume(response);
            } catch (err) {
                console.error('Erro ao buscar livro:', err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchBook();
    }, [id]);

    const myReview = reviews.find(review => review.userId === user?.id);

    const handleCreateReview = () => {
        setReviewText('');
        setReviewRating(5);

        setIsReviewModalOpen(true);
    };

    const handleEditReview = () => {
        if (!myReview) return;

        setReviewText(myReview.text);
        setReviewRating(myReview.rating);

        setIsReviewModalOpen(true);
    };

    const handlerDeleteReview = (reviewId: string) => {
        Toast.show({
            type: 'confirm',
            text1: 'Tem certeza que deseja deletar essa resenha?',
            text2: 'Uma vez deletada, a resenha não pode ser recuperada!',
            position: 'bottom',
            autoHide: false,
            props: {
                onConfirm: () => deleteReview(reviewId),
            }
        })
    }

    const handleSaveReview = async () => {
        if (!volume) return;

        if (!reviewText.trim()) {
            Toast.show({
                type: "error",
                text1: "Erro!",
                text2: "Por favor, digite uma resenha."
            })

            return;
        }

        try {
            if (myReview) {
                await updateReview(myReview.id, reviewRating, reviewText);
            }
            else {
                await addReview(volume, reviewRating, reviewText);
            }

            setIsReviewModalOpen(false);
        }
        catch (error) {
            console.error(error);
        }
    };

    const { width } = useWindowDimensions();
    if (!width) return null;

    return (
        <View style={styles.global}>
            <Header image={BookImg} title={"Livros XGH."} />
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
            >
                {
                    isLoading
                        ? <ActivityIndicator size="large" color="#2b2b2b" />
                        :
                        <View style={styles.main}>
                            <View style={styles.box}>
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: volume?.volumeInfo.imageLinks?.smallThumbnail ??
                                            volume?.volumeInfo.imageLinks?.thumbnail ??
                                            "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
                                    }}
                                />

                                <View style={styles.content}>
                                    <View style={styles.header}>
                                        <Text style={styles.title}>{volume?.volumeInfo.title}</Text>
                                        <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
                                            <Ionicons name={favoriteIconName} size={20} color={favoriteIconColor} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text>{volume?.volumeInfo.subtitle}</Text>
                                    <Text>{`Escrito por ${volume?.volumeInfo.authors?.join(", ")}`}</Text>
                                    <Text style={styles.publisher}>{`Editora: ${volume?.volumeInfo.publisher}, ${volume?.volumeInfo.publishedDate}`}</Text>
                                    <Text>{`${volume?.volumeInfo.pageCount} páginas`}</Text>
                                    <Text>{`Idioma: ${volume?.volumeInfo.language}`}</Text>

                                    <RenderHTML
                                        source={{
                                            html: volume?.volumeInfo.description ?? ''
                                        }}
                                        baseStyle={{ textAlign: 'justify', fontSize: 12, lineHeight: 20, marginTop: 10 }}
                                    />
                                </View>
                            </View>
                            <View style={styles.reviewsSection}>
                                <View style={styles.reviewHeader}>
                                    <Text style={styles.reviewTitle}>Resenhas</Text>
                                    <Button title={myReview ? 'Editar Resenha' : 'Escrever Resenha'} onClick={myReview ? handleEditReview : handleCreateReview} />
                                </View>

                                {reviews.map(review => (
                                    <View key={review.id} style={styles.reviewCard}>
                                        <View style={styles.reviewCardHeader}>
                                            <View>
                                                <Text style={styles.reviewAuthor}>
                                                    {review.username}
                                                </Text>

                                                <Text>{'⭐'.repeat(review.rating)}</Text>
                                            </View>

                                            {review.userId === user?.id &&
                                                (<View style={styles.reviewActions}>
                                                    <TouchableOpacity onPress={handleEditReview}>
                                                        <Ionicons
                                                            name="create-outline"
                                                            size={20}
                                                            color="#496b92"
                                                        />
                                                    </TouchableOpacity>

                                                    <TouchableOpacity onPress={() => handlerDeleteReview(review.id)}>
                                                        <Ionicons
                                                            name="trash-outline"
                                                            size={20}
                                                            color="#d9534f"
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                )}
                                        </View>

                                        <Text style={styles.reviewContent}>
                                            {review.text}
                                        </Text>

                                        <Text style={styles.reviewDate}>
                                            {new Date(review.updatedAt ?? review.createdAt).toLocaleDateString('pt-BR')}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                }
            </ScrollView >
            <Modal visible={isReviewModalOpen} transparent animationType="fade" >
                <View style={styles.modalOverlay}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>{myReview ? 'Editar Resenha' : 'Nova Resenha'}</Text>

                        <Text style={styles.label}>Nota</Text>
                        <View style={styles.stars}>
                            {[1, 2, 3, 4, 5].map(star => (
                                <TouchableOpacity key={star} onPress={() => setReviewRating(star)}>
                                    <Ionicons
                                        name={star <= reviewRating ? 'star' : 'star-outline'}
                                        size={30}
                                        color="#f0ad4e"
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TextInput
                            multiline
                            value={reviewText}
                            onChangeText={setReviewText}
                            placeholder="Escreva sua resenha..."
                            style={styles.reviewInput}
                        />

                        <View style={styles.modalActions}>
                            <Button title="Cancelar" onClick={() => setIsReviewModalOpen(false)} />
                            <Button title="Salvar" onClick={handleSaveReview} disabled={!reviewText} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    );
};

const styles = StyleSheet.create({
    global: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
        padding: 5,
    },
    scrollContent: {
        alignItems: "center",
        paddingBottom: 40,
    },
    main: {
        width: '100%',
        alignItems: 'center'
    },
    box: {
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
        maxWidth: 1200,
        padding: 15,
        borderRadius: 3,
        backgroundColor: "#fff"
    },
    image: {
        width: 128,
        height: 192,
        marginRight: 15,
        flexShrink: 0,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 900
    },
    publisher: {
        marginVertical: 10
    },
    favoriteButton: {
        padding: 5
    },
    reviewsSection: {
        marginTop: 15,
        width: "100%",
        maxWidth: 1200,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    reviewTitle: {
        fontSize: 22,
        fontWeight: '700',
    },
    reviewCard: {
        backgroundColor: '#fff',
        borderRadius: 3,
        padding: 15,
        marginBottom: 10,
    },
    reviewCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reviewAuthor: {
        fontWeight: '700',
        fontSize: 15,
    },
    reviewActions: {
        flexDirection: 'row',
        gap: 10,
    },
    reviewContent: {
        marginTop: 10,
        textAlign: 'justify',
    },
    reviewDate: {
        marginTop: 10,
        fontSize: 12,
        color: '#666',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
    },
    modal: {
        width: '90%',
        maxWidth: 500,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 3,
        marginTop: 150
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 15,
    },
    label: {
        marginBottom: 10,
        fontWeight: '600',
    },
    stars: {
        flexDirection: 'row',
        marginBottom: 15,
        gap: 5,
    },
    reviewInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        minHeight: 120,
        textAlignVertical: 'top',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        marginTop: 15,
    },
});

export default BookDetails;