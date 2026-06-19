import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View, FlatList, } from 'react-native';

export interface ISelectOption {
    label: string
    value: string
}

interface ISelectProps {
    title: string
    options: ISelectOption[]
    value: string
    onChange: (value: string) => void
}

const Select = (props: ISelectProps) => {
    const [visible, setVisible] = useState(false);

    const selected = props.options.find(option => option.value === props.value)?.label ?? "Selecione";

    const handleSelect = (value: string) => {
        props.onChange(value);
        setVisible(false);
    };

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>{props.title}</Text>

                <Pressable style={styles.select} onPress={() => setVisible(true)} >
                    <Text style={styles.select_text}>{selected}</Text>
                    <Text style={styles.arrow}>▼</Text>
                </Pressable>
            </View>

            <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)} >
                <Pressable style={styles.backdrop} onPress={() => setVisible(false)}>
                    <View style={styles.modal}>
                        <FlatList data={props.options} keyExtractor={item => item.value} renderItem={({ item }) => (
                            <Pressable
                                style={styles.option}
                                onPress={() =>
                                    handleSelect(item.value)
                                }
                            >
                                <Text style={[styles.option_text, item.value === props.value && styles.selected_option]} >
                                    {item.label}
                                </Text>
                            </Pressable>
                        )} />
                    </View>
                </Pressable>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 4,
    },
    title: {
        fontSize: 12,
        color: '#2b2b2b',
    },
    select: {
        padding: 7,
        borderColor: '#2b2b2b',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#fff',
        paddingHorizontal: 12,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    select_text: {
        fontSize: 16,
        color: '#2b2b2b',
    },
    arrow: {
        fontSize: 12,
        color: '#2b2b2b',
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'center',
        padding: 20,
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 10,
        maxHeight: 350,
        overflow: 'hidden',
    },
    option: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
    },
    option_text: {
        fontSize: 16,
        color: '#2b2b2b',
    },
    selected_option: {
        fontWeight: 'bold',
    },
});

export default Select;