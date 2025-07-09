import type {FilmSchedule, ScheduleResponse} from "../data/filmScheduleResponse.ts";
import {baseInstanceApi} from "./baseInstanceApi.ts";

export const fetchFilmSchedule = async (id: string): Promise<FilmSchedule[]> => {
    try {
        const response = await baseInstanceApi.get<ScheduleResponse>(`/film/${id}/schedule`)
        console.log(response.data)
        return response.data.schedules
    } catch (error) {
        throw error
    }
}