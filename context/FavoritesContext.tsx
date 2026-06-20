import { useAuth } from './AuthContext';
import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode, } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesContextData {
    favoriteIds: string[];
    isLoadingFavorites: boolean;
    toggleFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

interface FavoritesProviderProps {
    children: ReactNode;
}

const FavoritesContext = createContext<FavoritesContextData | undefined>(
    undefined
);

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {

    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
    const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);

    const { user } = useAuth();

    const getFavoritesKey = () => {
        if (!user) return null;
        return `@XGH:favorites:${user.id}`;
    };

    const loadFavorites = useCallback(async () => {
        if (!user) {
            setFavoriteIds([]);
            setIsLoadingFavorites(false);
            return;
        }

        try {
            const key = getFavoritesKey();
            const storedFavorites = await AsyncStorage.getItem(key!);

            if (storedFavorites) {
                setFavoriteIds(JSON.parse(storedFavorites));
            } else {
                setFavoriteIds([]);
            }
        }
        catch (error) {
            console.error('Erro ao carregar favoritos:', error);
        }
        finally {
            setIsLoadingFavorites(false);
        }
    }, [user]);

    const saveFavorites = useCallback(
        async (ids: string[]) => {
            if (!user) return;

            try {
                const key = getFavoritesKey();

                await AsyncStorage.setItem(key!, JSON.stringify(ids));
            }
            catch (error) {
                console.error('Erro ao salvar favoritos:', error);
            }
        },
        [user]
    );

    useEffect(() => {
        setIsLoadingFavorites(true);
        loadFavorites();
    }, [user, loadFavorites]);

    useEffect(() => {
        if (!isLoadingFavorites) {
            saveFavorites(favoriteIds);
        }
    }, [favoriteIds, isLoadingFavorites, saveFavorites]);

    const toggleFavorite = (id: string) => {
        setFavoriteIds(prevIds => {
            if (prevIds.includes(id))
                return prevIds.filter(
                    favoriteId => favoriteId !== id
                );

            return [...prevIds, id];
        });
    };

    const isFavorite = useCallback(
        (id: string) => {
            return favoriteIds.includes(id);
        }, [favoriteIds]
    );

    const contextValue: FavoritesContextData = {
        favoriteIds,
        isLoadingFavorites,
        toggleFavorite,
        isFavorite,
    };

    return (
        <FavoritesContext.Provider value={contextValue} >
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = (): FavoritesContextData => {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error(
            'useFavorites deve ser usado dentro de FavoritesProvider'
        );
    }

    return context;
};