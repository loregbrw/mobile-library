import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode, } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@GuiaTuristico:favorites';

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

export const FavoritesProvider = ({
    children,
}: FavoritesProviderProps) => {

    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
    const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);

    const loadFavorites = useCallback(async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);

            if (storedFavorites) {
                const parsed: string[] = JSON.parse(storedFavorites);
                setFavoriteIds(parsed);
            }
        } catch (error) {
            console.error(
                'Erro ao carregar favoritos do AsyncStorage:',
                error
            );
        } finally {
            setIsLoadingFavorites(false);
        }
    }, []);

    const saveFavorites = useCallback(async (ids: string[]) => {
        try {
            await AsyncStorage.setItem(
                FAVORITES_KEY,
                JSON.stringify(ids)
            );
        } catch (error) {
            console.error(
                'Erro ao salvar favoritos no AsyncStorage:',
                error
            );
        }
    }, []);

    useEffect(() => {
        loadFavorites();
    }, [loadFavorites]);

    useEffect(() => {
        if (!isLoadingFavorites) {
            saveFavorites(favoriteIds);
        }
    }, [favoriteIds, isLoadingFavorites, saveFavorites]);

    const toggleFavorite = (id: string) => {
        setFavoriteIds(prevIds => {
            if (prevIds.includes(id)) {
                return prevIds.filter(id => id !== id);
            }

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