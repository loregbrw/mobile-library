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
        backgroundColor: "#496b92",
        paddingVertical: 7,
        paddingHorizontal: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
    },
    disabledButton: {
        opacity: 0.45,
    },
    text: {
        fontWeight: "600",
        color: "#fff"
    }
});

export default Button;