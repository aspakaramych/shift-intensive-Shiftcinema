import type {Film} from "../api/filmsApi.ts";
import * as React from "react";
import {useNavigate} from "react-router";

interface FilmProps {
    film: Film
}

const FilmCard: React.FC<FilmProps> = ({film}) => {
    const navigate = useNavigate()
    return (
        <>
            <button onClick={() => navigate(`/cinema/${film.name}`)}>Подробнее</button>
        </>
    )
}

export default FilmCard