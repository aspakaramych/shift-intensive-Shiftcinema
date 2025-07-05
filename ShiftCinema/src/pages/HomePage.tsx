import {useEffect, useState} from "react";
import {fetchFilms} from "../api/filmsApi.ts";
import Header from "../components/Header.tsx";
import FilmCard from "../components/FilmCard.tsx";
import "../styles/homepage-style.css"
import type {Film} from "../data/filmResponse.ts";
import {toast} from "react-toastify";

const HomePage = () => {
    const [films, setFilms] = useState<Film[]>([])

    useEffect(() => {
        handleFetchFilms()
    }, [])

    const handleFetchFilms = async (): Promise<void> => {
        try {
            const response = await fetchFilms()
            setFilms(response)
            console.log(films)
        } catch (error) {
            toast.error("Ошибка загрузки фильмов")
        }
    }

    return (
        <>
            <Header/>
            <div className={"poster-container"}>
                <p>Афиша</p>
            </div>
            <div className={"class-card-list"}>

                    {films.length > 0 ? (
                        films.map((film: Film) => (
                            <FilmCard key={film.id} film={film}/>
                        ))) : (
                        <p>Нет фильмов</p>
                    )}

            </div>

        </>
    )
}

export default HomePage