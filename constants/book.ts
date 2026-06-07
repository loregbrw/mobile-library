import { EBookGenre } from "../types";

export const BookGenreLabels: Record<EBookGenre, string> = {
    [EBookGenre.Fantasy]: 'Fantasia',
    [EBookGenre.Romance]: 'Romance',
    [EBookGenre.Horror]: 'Terror',
    [EBookGenre.ScienceFiction]: 'Ficção Científica',
    [EBookGenre.Biography]: 'Biografia',
};