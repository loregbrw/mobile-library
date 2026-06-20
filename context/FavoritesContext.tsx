import { IVolume } from "../types";
import { useAuth } from './AuthContext';
import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode, } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IFavoriteBook {
    id: string
    title: string
    authors?: string[]
    thumbnail?: string
}

interface FavoritesContextData {
    favoriteBooks: IFavoriteBook[]
    isLoadingFavorites: boolean
    toggleFavorite: (volume: IVolume) => void
    isFavorite: (id: string) => boolean
}

interface FavoritesProviderProps {
    children: ReactNode;
}

const FavoritesContext = createContext<FavoritesContextData | undefined>(
    undefined
);

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {

    const [favoriteBooks, setFavoriteBooks] = useState<IFavoriteBook[]>([]);
    const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);

    const { user } = useAuth();

    const getFavoritesKey = () => {
        if (!user) return null;
        return `@XGH:favorites:${user.id}`;
    };

    const loadFavorites = useCallback(async () => {
        if (!user) {
            setFavoriteBooks([]);
            setIsLoadingFavorites(false);
            return;
        }

        try {
            const key = getFavoritesKey();
            const storedFavorites = await AsyncStorage.getItem(key!);

            if (storedFavorites)
                setFavoriteBooks(JSON.parse(storedFavorites));
            else
                setFavoriteBooks([]);
        }
        catch (error) {
            console.error('Erro ao carregar favoritos:', error);
        }
        finally {
            setIsLoadingFavorites(false);
        }
    }, [user]);

    const saveFavorites = useCallback(
        async (books: IFavoriteBook[]) => {
            if (!user) return;

            try {
                const key = getFavoritesKey();

                await AsyncStorage.setItem(
                    key!,
                    JSON.stringify(books)
                );
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
        if (!isLoadingFavorites)
            saveFavorites(favoriteBooks);
    }, [favoriteBooks, isLoadingFavorites, saveFavorites]);

    const toggleFavorite = (volume: IVolume) => {
        setFavoriteBooks(previous => {
            const exists = previous.some(book => book.id === volume.id);

            if (exists)
                return previous.filter(book => book.id !== volume.id);

            return [
                ...previous,
                {
                    id: volume.id,
                    title: volume.volumeInfo.title,
                    authors: volume.volumeInfo.authors,
                    thumbnail: volume.volumeInfo.imageLinks?.smallThumbnail ?? volume.volumeInfo.imageLinks?.thumbnail ?? "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
                }
            ];
        });
    };

    const isFavorite = useCallback(
        (id: string) => favoriteBooks.some(book => book.id === id),
        [favoriteBooks]
    );

    const contextValue: FavoritesContextData = {
        favoriteBooks,
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