import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

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

        if (!text) return;
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

                <Pressable style={styles.button} onPress={handleSearch}>
                    <Text style={styles.text}>
                        {props.button}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 3
    },
    title: {
        color: '#2b2b2b',
        fontSize: 12
    },
    row: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: 10
    },
    input: {
        flex: 1,
        borderColor: '#2b2b2b',
        borderWidth: 1,
        borderRadius: 3,
        padding: 7,
        backgroundColor: "#fff"
    },
    button: {
        backgroundColor: "#496b92",
        paddingHorizontal: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
    },
    text: {
        color: "#fff"
    }
});

export default Input;