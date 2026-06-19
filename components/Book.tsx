import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { IVolume } from "../types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

interface IBookProps {
    volume: IVolume;
}

type NavigationProps = StackNavigationProp<
    RootStackParamList,
    'BookDetails'
>;

const Book = (props: IBookProps) => {

    const navigation = useNavigation<NavigationProps>();

    const handleGoToDetails = () => {
        navigation.navigate('BookDetails', { id: props.volume.id });
    };

    return (
        <TouchableOpacity style={styles.touchable} onPress={handleGoToDetails}>
            <Image
                style={styles.image}
                source={{
                    uri: props.volume.volumeInfo.imageLinks?.smallThumbnail ?? props.volume.volumeInfo.imageLinks?.thumbnail ?? "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
                }}
            />
            <Text style={styles.title} numberOfLines={2}>{props.volume.volumeInfo.title}</Text>
            <Text style={styles.author}>{`${props.volume.volumeInfo.authors?.join(", ")}, ${props.volume.volumeInfo.publishedDate}`}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    touchable: {
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
        fontSize: 10,
        textAlign: "center"
    }
})


export default Book;
