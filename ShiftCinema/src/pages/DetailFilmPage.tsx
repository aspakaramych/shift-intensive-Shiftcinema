import Header from "../components/Header.tsx";
import {useNavigate, useParams} from "react-router";
import {useState} from "react";
import type {Film} from "../data/filmResponse.ts";
import {fetchFilmDetail} from "../api/filmDetailApi.ts";
import {toast} from "react-toastify";
import {fetchFilmSchedule} from "../api/filmSheduleApi.ts";
import type {FilmSchedule} from "../data/filmScheduleResponse.ts";
import {ImageLoader} from "../components/ImageLoader.tsx";
import {useQuery} from "@tanstack/react-query";

const ratingMap: { [key: string]: string } = {
    "G": "0+",
    "PG": "6+",
    "PG13": "12+",
    "R": "16+",
    "NC17": "18+",
}


const DetailFilmPage = () => {
    const {filmId} = useParams<{ filmId: string }>()
    const [filmSchedule, setFilmSchedule] = useState<FilmSchedule>();

    const navigate = useNavigate();


    const {data: film, isLoading: isFilmLoading, isError: isFilmError} = useQuery<Film>({
        queryKey: ["film", filmId],
        queryFn: () => fetchFilmDetail(filmId!),
        staleTime: 1000 * 60 * 5,
        retry: 2,
        enabled: !!filmId,
        onError: (err) => {
            toast.error("Ошибка при получении деталей фильма")
            console.log(err)
        },

    })

    if (isFilmLoading) {
        return (
            <>
                <Header/>
                <div>
                    <p>Загрузка данных о фильме</p>
                </div>
            </>
        )
    }

    if (isFilmError) {
        return (
            <>
                <Header />
                <div>
                    <button onClick={() => navigate("/cinema/today")}></button>
                </div>
            </>
        )
    }

    return (
        <>
            <Header/>
            <button onClick={() => navigate("/cinema/today")}>Назад</button>
            <div>
                <div>
                    <ImageLoader url={`https://shift-intensive.ru/api${film.img}`}></ImageLoader>
                    <div>
                        <p>{film.genres[0]}</p>
                        <p>{film.country.name} {film.releaseDate.slice(film.releaseDate.length - 4, film.releaseDate.length)}</p>
                    </div>
                </div>
                <div>
                    <h3 className={"film-title"}>{film.name} ({ratingMap[film.ageRating]})</h3>
                    <p className={"film-type"}>Фильм</p>
                    <p>{film.description}</p>
                </div>
            </div>
            <div>
                <p>Расписание</p>
            </div>
        </>
    )
}

export default DetailFilmPage