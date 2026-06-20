import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';

interface IHeaderProps {
    image?: ImageSourcePropType
    title?: string
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
        backgroundColor: '#496b92',
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 35,
        height: 35,
        objectFit: "contain"
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 3,
        color: '#ffffff'
    },
});

export default Header;