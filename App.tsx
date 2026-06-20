import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import BookDetails from './screens/BookDetails';
import { IOpenLibraryBook } from './types';

export type RootStackParamList = {
    BookList: undefined;
    BookDetails: { book: IOpenLibraryBook };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
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
    );
}