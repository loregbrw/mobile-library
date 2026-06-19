import 'react-native-gesture-handler';

import { FavoritesProvider } from './context/FavoritesContext';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from './screens/Home';
import BookDetails from './screens/BookDetails';
import FavoritesScreen from './screens/FavoritesScreen';
import MapScreen from './screens/MapScreen';
import { createStackNavigator } from '@react-navigation/stack';

export type RootStackParamList = {
    BookList: undefined;
    BookDetails: { id: string };
};

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ExploreStack = () => {
    return (
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
    );
}

const App = () => {
    return (
        <FavoritesProvider>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            const icons = {
                                Explorar: focused ? 'compass' : 'compass-outline',
                                Favoritos: focused ? 'heart' : 'heart-outline',
                                Mapa: focused ? 'map' : 'map-outline',
                            } as const;

                            return (
                                <Ionicons name={icons[route.name as keyof typeof icons]} size={size} color={color} />
                            );
                        },

                        tabBarActiveTintColor: '#496b92',
                        tabBarInactiveTintColor: 'gray',
                        headerShown: false,
                    })}
                >
                    <Tab.Screen
                        name="Explorar"
                        component={ExploreStack}
                        options={{ tabBarLabel: 'Explorar' }}
                    />
                    <Tab.Screen
                        name="Favoritos"
                        component={FavoritesScreen}
                        options={{ tabBarLabel: 'Favoritos' }}
                    />
                    <Tab.Screen
                        name="Mapa"
                        component={MapScreen}
                        options={{ tabBarLabel: 'Mapa' }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </FavoritesProvider>
    );
}

export default App;