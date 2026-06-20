import { Image, StyleSheet, Text, Pressable } from "react-native";
import { IOpenLibraryBook } from "../types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

interface IBookProps {
    book: IOpenLibraryBook;
}

type NavigationProps = StackNavigationProp<RootStackParamList, 'BookDetails'>;

const Book = (props: IBookProps) => {
    const navigation = useNavigation<NavigationProps>();

    const handleGoToDetails = () => {
        navigation.navigate('BookDetails', { book: props.book });
    };

    const coverUrl = props.book.cover_i 
        ? `https://covers.openlibrary.org/b/id/${props.book.cover_i}-M.jpg`
        : "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";

    return (
        <Pressable style={styles.container} onPress={handleGoToDetails}>
            <Image
                style={styles.image}
                source={{ uri: coverUrl }}
            />
            <Text style={styles.title} numberOfLines={2}>{props.book.title}</Text>
            <Text style={styles.author}>{`${props.book.author_name?.join(", ") ?? "Autor Desconhecido"}, ${props.book.first_publish_year ?? ""}`}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 170,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
    },
    image: {
        height: 192,
        width: 128,
        objectFit: "fill"
    },
    title: {
        marginTop: 8,
        textAlign: 'center',
    },
    author: {
        fontSize: 10
    }
})


export default Book;
