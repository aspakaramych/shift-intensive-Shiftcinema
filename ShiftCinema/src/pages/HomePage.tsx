import {useEffect, useState} from "react";
import {fetchFilms, type Film} from "../api/filmsApi.ts";
import Header from "../components/Header.tsx";
import FilmCard from "../components/FilmCard.tsx";
import "../styles/homepage-style.css"

const HomePage = () => {
    const [films, setFilms] = useState<Film[]>([])

    useEffect(() => {
        handleFetchFilms()
    }, [])

    const handleFetchFilms = async (): Promise<void> => {
        const response = await fetchFilms()
        setFilms(response)
        console.log(films)
    }

    return (
        <>
            <Header/>
            <div>
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