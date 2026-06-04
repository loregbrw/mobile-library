import { IVolume } from './google-books';

export interface IPaginatedBooksResponse {
    items: IVolume[];
    totalItems: number;
    totalPages: number;
    page: number;
    pageSize: number;
    hasNext: boolean;
    hasPrevious: boolean;
}