export enum EBookGenre {
    Fantasy = 'Fantasy',
    Romance = 'Romance',
    Horror = 'Horror',
    ScienceFiction = 'Science Fiction',
    Biography = 'Biography',
}

export interface IGoogleBooksResponse {
    kind: string;
    totalItems: number;
    items?: IVolume[];
}

export interface IVolume {
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: IVolumeInfo;
}

export interface IVolumeInfo {
    title: string;
    subtitle?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    language?: string;
    imageLinks?: IImageLinks;
}

export interface IImageLinks {
    smallThumbnail?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    extraLarge?: string;
}