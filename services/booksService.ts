import { api } from './api';
import { EBookGenre, IGoogleBooksResponse, IVolume } from '../types/google-books';
import { IPaginatedBooksResponse } from '../types/dtos';

interface IBookSearchFilters {
    query?: string;
    title?: string;
    author?: string;
    genre?: EBookGenre;
    page?: number;
    pageSize?: number;
}

export class BooksService {
    static async getBooks(filters: IBookSearchFilters): Promise<IPaginatedBooksResponse> {

        const page = filters.page ?? 1;
        const pageSize = filters.pageSize ?? 20;

        const q = [
            filters.query,
            filters.title && `intitle:${filters.title}`,
            filters.author && `inauthor:${filters.author}`,
            filters.genre && `subject:${filters.genre}`,
        ].filter(Boolean).join(' ');

        const startIndex = (page - 1) * pageSize;

        const { data } = await api.get<IGoogleBooksResponse>(
            "/volumes",
            {
                params: {
                    q,
                    startIndex,
                    maxResults: pageSize,
                },
            }
        );

        return {
            items: data.items ?? [],
            totalItems: data.totalItems,
            totalPages: Math.ceil(data.totalItems / pageSize),
            page,
            pageSize,
            hasPrevious: page > 1,
            hasNext: startIndex + pageSize < data.totalItems,
        };
    }

    static async getBookById(id: string): Promise<IVolume> {
        const { data } = await api.get<IVolume>(
            `/volumes/${id}`
        );

        return data;
    }
}
