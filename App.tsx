import 'react-native-gesture-handler';

import { FavoritesProvider } from './context/FavoritesContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import BookDetails from './screens/BookDetails';

export type RootStackParamList = {
    BookList: undefined;
    BookDetails: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <FavoritesProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="BookList">
                    <Stack.Screen
                        name="BookList"
                        component={Home}
                        options={{ title: 'Lista de Livros' }}
                    />
                    <Stack.Screen
                        name="BookDetails"
                        component={BookDetails}
                        options={{ title: 'Detalhes' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </FavoritesProvider>
    );
}

export default App;