import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ICardProps {
    title: string
    description: string
    info?: string
}

const Card = (props: ICardProps) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.description}>{props.description}</Text>
            {
                props.info &&
                <Text style={styles.info}>{props.info}</Text>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    info: {
        marginTop: 15
    }
});

export default Card;