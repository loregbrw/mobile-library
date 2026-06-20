import { IOpenLibraryBook } from './open-library';

export interface IPaginatedBooksResponse {
    items: IOpenLibraryBook[];
    totalItems: number;
    totalPages: number;
    page: number;
    pageSize: number;
    hasNext: boolean;
    hasPrevious: boolean;
}