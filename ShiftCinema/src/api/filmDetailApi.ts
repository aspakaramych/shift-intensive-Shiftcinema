import axios from "axios";
import type {FilmDetailResponse} from "../data/filmDetailResponse.ts";
import type {Film} from "../data/filmResponse.ts";

const filmDetailApi = axios.create({
    baseURL: "https://shift-intensive.ru/api/cinema/film"
})

export const fetchFilmDetail =  async (id: string) : Promise<Film> => {
    try {
        const response = await filmDetailApi.get<FilmDetailResponse>(`/${id}`)
        console.log(response.data)
        return response.data.film
    } catch (error){
        throw error
    }
}