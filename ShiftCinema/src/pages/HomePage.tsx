import {fetchFilms} from "../api/filmsApi.ts";
import Header from "../components/Header.tsx";
import FilmCard from "../components/FilmCard.tsx";
import "../styles/homepage-style.css"
import type {Film} from "../data/filmResponse.ts";
import {toast} from "react-toastify";
import {useQuery} from "@tanstack/react-query";


const HomePage = () => {
    const {data: films, isLoading: isFilmsLoading, isError: isFilmsError} = useQuery<Film[]>({
        queryKey: ["films", "films"],
        queryFn: () => fetchFilms(),
        staleTime: 1000 * 60 * 5,
        retry: 2,
        onError: (err) => {
            toast.error("Ошибка при получении фильмов")
            console.log(err)
        },

    })

    if (isFilmsLoading) {
        return (
            <>
                <Header/>
                <div>
                    <p>Загрузка данных о фильмах</p>
                </div>
            </>
        )
    }

    if (isFilmsError) {
        return (
            <>
                <Header/>
                <div>

                </div>
            </>
        )
    }

    if (!films || films.length === 0) {
        return (
            <>
                <Header/>
                <div>
                    <p>На данный момент фильмов нет</p>
                </div>
            </>
        )
    }

    return (
        <>
            <Header/>
            <div className={"poster-container"}>
                <p>Афиша</p>
            </div>
            <div className={"class-card-list"}>
                {films.map((film: Film) => (
                    <FilmCard key={film.id} film={film}/>
                ))}

            </div>

        </>
    )
}

export default HomePage