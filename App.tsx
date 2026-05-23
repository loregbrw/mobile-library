import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BookList from './screens/BookList';
import BookDetails from './screens/BookDetails';

export type RootStackParamList = {
    BookList: undefined;
    BookDetails: { index: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="BookList">
                <Stack.Screen
                    name="BookList"
                    component={BookList}
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