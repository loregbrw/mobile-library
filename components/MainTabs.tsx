import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import BookDetails from "../screens/BookDetails";
import FavoritesScreen from "../screens/FavoritesScreen";
import MapScreen from "../screens/MapScreen";
import ProfileScreen from "../screens/ProfileScreen";

export type RootStackParamList = {
    BookList: undefined;
    BookDetails: { id: string };
};

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

const MainTabs = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                const icons = {
                    Explorar: focused ? 'compass' : 'compass-outline',
                    Favoritos: focused ? 'heart' : 'heart-outline',
                    Mapa: focused ? 'map' : 'map-outline',
                    Perfil: focused ? 'person' : 'person-outline',
                } as const;

                return (
                    <Ionicons
                        name={icons[route.name as keyof typeof icons]}
                        size={size}
                        color={color}
                    />
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
        />

        <Tab.Screen
            name="Favoritos"
            component={FavoritesScreen}
        />

        <Tab.Screen
            name="Mapa"
            component={MapScreen}
        />

        <Tab.Screen
            name="Perfil"
            component={ProfileScreen}
        />
    </Tab.Navigator>
);

export default MainTabs;