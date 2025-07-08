import type {Film} from "./filmResponse.ts";

export interface FilmDetailResponse {
    "success": boolean
    "reason": string
    "film": Film
}