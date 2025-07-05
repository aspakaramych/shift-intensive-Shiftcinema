import axios from "axios";
import type {Film, FilmsResponse} from "../data/filmResponse.ts";

const filmsApi = axios.create({
    baseURL: 'https://shift-intensive.ru/api/cinema',
})

export const fetchFilms = async () : Promise<Film[]> => {
    try {
        const response = await filmsApi.get<FilmsResponse>("/films")
        console.log(response.data)
        return response.data.films
    } catch (error) {
        throw error
    }
}