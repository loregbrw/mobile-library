import { IVolume } from "../types";
import { BooksService } from "../services/booksService";
import { RootStackParamList } from "../App";
import { useRoute, RouteProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, ActivityIndicator, Text, useWindowDimensions, ScrollView } from "react-native";

import Header from "../components/Header";
import BookImg from '../assets/book.png';
import RenderHTML from 'react-native-render-html';

type BookDetailsRouteProp = RouteProp<
    RootStackParamList,
    'BookDetails'
>;

const BookDetails = () => {

    const [volume, setVolume] = useState<IVolume>();
    const [isLoading, setIsLoading] = useState(true);

    const route = useRoute<BookDetailsRouteProp>();
    const { id } = route.params;

    const { width } = useWindowDimensions();
    const tagsStyles = {
        p: {
            textAlign: 'justify',
        },
        div: {
            textAlign: 'justify',
        },
        li: {
            textAlign: 'justify',
        },
    };

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
    }, [id])

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
                                <Text style={styles.title}>{volume?.volumeInfo.title}</Text>
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
                }
            </ScrollView>
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
    content: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 900
    },
    publisher: {
        marginVertical: 10
    }
});

export default BookDetails;