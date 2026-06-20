import { IVolume } from '../types';
import { useAuth } from './AuthContext';
import { createContext, useCallback, useContext, useEffect, useState, ReactNode, } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const REVIEWS_KEY = '@XGH:reviews';

export interface IReviewBook {
    id: string;
    title: string;
    authors: string[];
    thumbnail?: string;
}

export interface IReview {
    id: string;

    userId: string;
    username: string;

    book: IReviewBook;

    rating: number;
    text: string;

    createdAt: string;
    updatedAt?: string;
}

interface ReviewsContextData {
    reviews: IReview[];
    isLoadingReviews: boolean;

    addReview: (volume: IVolume, rating: number, text: string) => Promise<void>;
    updateReview: (reviewId: string, rating: number, text: string) => Promise<void>;
    deleteReview: (reviewId: string) => Promise<void>;
    getReviewsByBook: (bookId: string) => IReview[];
    getReviewsByUser: (userId: string) => IReview[];
}

interface ReviewsProviderProps {
    children: ReactNode;
}

const ReviewsContext = createContext<ReviewsContextData | undefined>(undefined);

export const ReviewsProvider = ({ children, }: ReviewsProviderProps) => {

    const [reviews, setReviews] = useState<IReview[]>([]);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);

    const { user } = useAuth();

    const loadReviews = useCallback(async () => {
        try {
            const storedReviews = await AsyncStorage.getItem(REVIEWS_KEY);

            if (storedReviews) {
                setReviews(
                    JSON.parse(storedReviews)
                );
            }
        }
        catch (error) {
            console.error('Error loading reviews:', error
            );
        }
        finally {
            setIsLoadingReviews(false);
        }
    }, []);

    const saveReviews = useCallback(
        async (reviewsToSave: IReview[]) => {
            try {
                await AsyncStorage.setItem(REVIEWS_KEY, JSON.stringify(reviewsToSave));
            }
            catch (error) {
                console.error('Error saving reviews:', error);
            }
        },
        []
    );

    useEffect(() => {
        loadReviews();
    }, [user, loadReviews]);

    useEffect(() => {
        if (!isLoadingReviews)
            saveReviews(reviews);
    }, [reviews, isLoadingReviews, saveReviews]);

    const addReview = async (volume: IVolume, rating: number, text: string) => {
        if (!user) return;

        const newReview: IReview = {
            id: Date.now().toString(),

            userId: user.id,
            username: user.username,

            rating,
            text,

            createdAt:
                new Date().toISOString(),

            book: {
                id: volume.id,
                title: volume.volumeInfo.title,
                authors: volume.volumeInfo.authors ?? [],
                thumbnail: volume.volumeInfo.imageLinks?.smallThumbnail ?? volume.volumeInfo.imageLinks?.thumbnail ?? "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png",
            },
        };

        setReviews(prev => [...prev, newReview,]);
    };

    const updateReview = async (reviewId: string, rating: number, text: string) => {
        setReviews(prev =>
            prev.map(review =>
                review.id === reviewId ? { ...review, rating, text, updatedAt: new Date().toISOString(), } : review
            )
        );
    };

    const deleteReview = async (reviewId: string) => {
        setReviews(prev =>
            prev.filter(review => review.id !== reviewId)
        );
    };

    const getReviewsByBook = (bookId: string) => reviews.filter(review => review.book.id === bookId);
    const getReviewsByUser = (userId: string) => reviews.filter(review => review.userId === userId);

    const contextValue: ReviewsContextData = {
        reviews,
        isLoadingReviews,

        addReview,
        updateReview,
        deleteReview,

        getReviewsByBook,
        getReviewsByUser,
    };

    return (
        <ReviewsContext.Provider
            value={contextValue}
        >
            {children}
        </ReviewsContext.Provider>
    );
};

export const useReviews = (): ReviewsContextData => {
    const context = useContext(ReviewsContext);

    if (!context) {
        throw new Error(
            'useReviews must be used inside ReviewsProvider'
        );
    }

    return context;
};