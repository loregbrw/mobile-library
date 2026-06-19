import axios from 'axios';

export const api = axios.create({
    baseURL: "https://www.googleapis.com/books/v1",
    params: {
        key: process.env.EXPO_PUBLIC_API_KEY,
    },
});