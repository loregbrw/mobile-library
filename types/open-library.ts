export interface IOpenLibrarySearchResponse {
    numFound: number;
    start: number;
    docs: IOpenLibraryBook[];
}

export interface IOpenLibraryBook {
    key: string;
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    number_of_pages_median?: number;
    cover_i?: number;
    isbn?: string[];
    subject?: string[];
}

export interface IOpenLibraryWorkDetails {
    title: string;
    description?: string | { value: string };
    covers?: number[];
}