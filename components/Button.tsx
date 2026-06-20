import { TouchableOpacity, StyleSheet, Text } from "react-native";

interface IButtonProps {
    title: string
    disabled?: boolean
    outlined?: boolean
    onClick: () => void
}

const Button = (props: IButtonProps) => {
    return (
        <TouchableOpacity
            style={[styles.button, props.disabled && styles.disabledButton, props.outlined && styles.outlinedButton]}
            disabled={props.disabled}
            onPress={props.onClick}
        >
            <Text style={[styles.text, props.outlined && styles.outlinedText]}>{props.title}</Text>
        </TouchableOpacity>
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
    outlinedButton: {
        borderColor: "#496b92",
        borderWidth: 2,
        backgroundColor: "#fff",
    },
    text: {
        fontWeight: "600",
        color: "#fff"
    },
    outlinedText: {
        fontWeight: "700",
        color: "#496b92",
    }
});

export default Button;