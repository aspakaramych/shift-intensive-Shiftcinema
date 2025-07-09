import type {Film, FilmsResponse} from "../data/filmResponse.ts";
import {baseInstanceApi} from "./baseInstanceApi.ts";


export const fetchFilms = async (): Promise<Film[]> => {
    try {
        const response = await baseInstanceApi.get<FilmsResponse>("/films")
        console.log(response.data)
        return response.data.films
    } catch (error) {
        throw error
    }
}