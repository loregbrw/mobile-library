import { createContext, useCallback, useContext, useEffect, useState, ReactNode, } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface IUser {
    id: string;
    username: string;
}

interface IAuthContext {
    user: IUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (username: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);
const STORAGE_KEY = '@XGH:user';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children, }: AuthProviderProps) => {

    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadUser = useCallback(async () => {
        try {
            const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedUser) setUser(JSON.parse(storedUser));
        }
        catch (error) {
            console.error('Error loading user:', error);
        }
        finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const login = async (username: string): Promise<void> => {
        try {
            const userData: IUser = {
                id: username.trim().toLowerCase().replace(/\s+/g, "-"),
                username,
            };

            setUser(userData);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        }
        catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const logout = async (): Promise<void> => {
        try {
            setUser(null);
            await AsyncStorage.removeItem(STORAGE_KEY);
        }
        catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout, }} >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);