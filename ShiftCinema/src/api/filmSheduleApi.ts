import axios from "axios";
import type {FilmSchedule, ScheduleResponse} from "../data/filmScheduleResponse.ts";

const filmScheduleApi = axios.create({
    baseURL: "https://shift-intensive.ru/api/cinema/film"
})

export const fetchFilmSchedule =  async (id: string) : Promise<FilmSchedule[]> => {
    try {
        const response = await filmScheduleApi.get<ScheduleResponse>(`/${id}/schedule`)
        console.log(response.data)
        return response.data.schedules
    } catch (error){
        throw error
    }
}