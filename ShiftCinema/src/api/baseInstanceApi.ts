import axios from "axios";

export const baseInstanceApi = axios.create({
    baseURL: 'https://shift-intensive.ru/api/cinema',
})