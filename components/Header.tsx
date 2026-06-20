import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';

interface IHeaderProps {
    image: ImageSourcePropType
    title: string
}

const Header = (props: IHeaderProps) => {
    return (
        <View style={styles.header}>
            <Image style={styles.image} source={props.image} />
            <Text style={styles.title}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#2d3436',
        paddingVertical: 12,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        elevation: 4,
    },

    image: {
        width: 30,
        height: 30,
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        letterSpacing: 1
    },
});

export default Header;