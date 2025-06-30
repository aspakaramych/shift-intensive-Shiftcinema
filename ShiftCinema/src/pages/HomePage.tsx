import {useEffect, useState} from "react";
import {fetchFilms, type Film} from "../api/filmsApi.ts";
import Header from "../components/Header.tsx";

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
        </>
    )
}

export default HomePage