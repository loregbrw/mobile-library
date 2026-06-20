import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from './Button';

interface IInputProps {
    title: string;
    placeholder?: string;
    button: string;
    onSearch: (value: string) => void;
}

const Input = (props: IInputProps) => {

    const [value, setValue] = useState('');

    const handleSearch = () => {
        const text = value.trim();

        props.onSearch(text);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>

            <View style={styles.row}>
                <TextInput
                    value={value}
                    onChangeText={setValue}
                    style={styles.input}
                    placeholder={props.placeholder ?? 'Digite aqui...'}
                    returnKeyType="search"
                    onSubmitEditing={handleSearch}
                />

                <Button title={props.button} onClick={handleSearch} />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 5
    },
    title: {
        color: '#636e72',
        fontSize: 13,
        fontWeight: '600',
        marginLeft: 5
    },
    row: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: 8,
        alignItems: 'center'
    },
    input: {
        flex: 1,
        borderColor: '#b2bec3',
        borderWidth: 1.5,
        borderRadius: 25,
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        fontSize: 15
    }
});

export default Input;
