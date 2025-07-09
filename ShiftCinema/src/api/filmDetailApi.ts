import type {FilmDetailResponse} from "../data/filmDetailResponse.ts";
import type {Film} from "../data/filmResponse.ts";
import {baseInstanceApi} from "./baseInstanceApi.ts";

export const fetchFilmDetail = async (id: string): Promise<Film> => {
    try {
        const response = await baseInstanceApi.get<FilmDetailResponse>(`/film/${id}`)
        console.log(response.data)
        return response.data.film
    } catch (error) {
        throw error
    }
}