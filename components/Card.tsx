import React from 'react';

import { Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './MainTabs';

interface ICardProps {
    index: number
    title: string
    description: string
    info?: string
}

type NavigationProps = StackNavigationProp<
    RootStackParamList,
    'BookDetails'
>;

const Card = (props: ICardProps) => {

    const navigation = useNavigation<NavigationProps>();

    const handleGoToDetails = () => {
        navigation.navigate('BookDetails', { id: props.index });
    };

    return (
        <Pressable style={styles.card} onPress={handleGoToDetails}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.description}>{props.description}</Text>
            {
                props.info &&
                <Text style={styles.info}>{props.info}</Text>
            }
        </Pressable>
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