import 'react-native-gesture-handler';

import { AuthProvider } from './context/AuthContext';
import { ReviewsProvider } from './context/ReviewsContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import AppRoutes from './Routes/AppRoutes';

import Toast, {
    ToastConfig,
    ToastConfigParams,
} from 'react-native-toast-message';
import Button from './components/Button';

const toastConfig: ToastConfig = {

    confirm: (params: ToastConfigParams<any>) => {
        const { text1, text2, props } = params;

        return (
            <View style={styles.toastContainer}>
                <View style={styles.leftBorder} />
                <View style={styles.content}>
                    <Text style={styles.title}>{text1}</Text>

                    {!!text2 && (
                        <Text style={styles.description}>
                            {text2}
                        </Text>
                    )}

                    <View style={styles.buttonGroup}>
                        <Button title="Cancelar" onClick={() => {
                            props?.onCancel?.();
                            Toast.hide();
                        }} outlined={true} />

                        <Button title="Confirmar" onClick={() => {
                            props?.onConfirm?.();
                            Toast.hide();
                        }} />
                    </View>
                </View>
            </View>
        );
    },
};


const App = () => {
    return (
        <AuthProvider>
            <FavoritesProvider>
                <ReviewsProvider>
                    <NavigationContainer>
                        <AppRoutes />
                        <Toast position='bottom' bottomOffset={40} config={toastConfig} />
                    </NavigationContainer>
                </ReviewsProvider>
            </FavoritesProvider>
        </AuthProvider>
    );
}
const styles = StyleSheet.create({
    toastContainer: {
        width: '90%',
        minHeight: 80,
        backgroundColor: '#fff',
        borderRadius: 8,
        flexDirection: 'row',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,

        elevation: 4,
    },
    leftBorder: {
        width: 6,
        backgroundColor: '#496b92',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    content: {
        flex: 1,
        padding: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#222',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 12,
        gap: 5
    },
});
export default App;