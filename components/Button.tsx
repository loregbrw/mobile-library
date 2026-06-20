import { Pressable, StyleSheet, Text } from "react-native";

interface IButtonProps {
    title: string
    disabled?: boolean
    onClick: () => void
}

const Button = (props: IButtonProps) => {
    return (
        <Pressable
            style={[styles.button, props.disabled && styles.disabledButton]}
            disabled={props.disabled}
            onPress={props.onClick}
        >
            <Text style={styles.text}>{props.title}</Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#636e72",
        paddingVertical: 10,
        paddingHorizontal: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
    disabledButton: {
        opacity: 0.45,
        backgroundColor: "#b2bec3"
    },
    text: {
        fontWeight: "700",
        color: "#fff",
        fontSize: 14
    }
});

export default Button;