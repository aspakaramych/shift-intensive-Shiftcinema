import axios from "axios";
import {toast} from "react-toastify";

const filmsApi = axios.create({
    baseURL: 'https://shift-intensive.ru/api/cinema',
})

interface ActorsDirectors {
    id: string
    professions: string
    fullName: string
}

interface Rating {
    kinopoisk: string
    imdb: string
}

interface Country {
    name: string
    code: string
    code2: string
    id: number
}

export interface Film {
    id: string
    name: string
    originalName: string
    description: string
    releaseDate: string
    actors: ActorsDirectors[]
    directors: ActorsDirectors[]
    runtime: number
    ageRating: string
    genres: string[]
    userRating: Rating
    img: string
    country: Country
}

interface FilmsResponse {
    success: boolean
    reason: string
    films: Film[]
}

export const fetchFilms = async () : Promise<Film[]> => {
    try {
        const response = await filmsApi.get<FilmsResponse>("/films")
        console.log(response.data)
        return response.data.films
    } catch (error) {
        toast.error("Ошибка загрузки фильмов")
        throw error
    }
}