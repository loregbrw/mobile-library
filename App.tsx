import 'react-native-gesture-handler';

import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { NavigationContainer } from '@react-navigation/native';

import AppRoutes from './Routes/AppRoutes';

const App = () => {
    return (
        <AuthProvider>
            <FavoritesProvider>
                <NavigationContainer>
                    <AppRoutes />
                </NavigationContainer>
            </FavoritesProvider>
        </AuthProvider>
    );
}

export default App;