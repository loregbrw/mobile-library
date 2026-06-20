import { api } from './api';
import { IOpenLibrarySearchResponse, IOpenLibraryWorkDetails } from '../types/open-library';
import { IPaginatedBooksResponse } from '../types/dtos';

interface IBookSearchFilters {
    query?: string;
    page?: number;
    pageSize?: number;
}

export class BooksService {
    static async getBooks(filters: IBookSearchFilters): Promise<IPaginatedBooksResponse> {
        const page = filters.page ?? 1;
        const pageSize = filters.pageSize ?? 20;

        const params: Record<string, any> = {
            page,
            limit: pageSize,
        };

        if (filters.query && filters.query.trim() !== '') {
            params.q = filters.query.trim();
        } else {
            params.q = 'books';
        }

        try {
            const { data } = await api.get<IOpenLibrarySearchResponse>('/search.json', { params });

            return {
                items: data.docs ?? [],
                totalItems: data.numFound ?? 0,
                totalPages: Math.ceil((data.numFound ?? 0) / pageSize),
                page,
                pageSize,
                hasPrevious: page > 1,
                hasNext: (page * pageSize) < (data.numFound ?? 0),
            };
        } catch (error) {
            console.error("Erro ao buscar livros na Open Library:", error);
            throw error;
        }
    }

    static async getBookDetails(workKey: string): Promise<IOpenLibraryWorkDetails> {
        const { data } = await api.get<IOpenLibraryWorkDetails>(`${workKey}.json`);
        return data;
    }
}