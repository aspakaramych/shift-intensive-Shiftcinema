
import * as React from "react";
import {useNavigate} from "react-router";
import "../styles/class-card-style.css"
import type {Film} from "../data/filmResponse.ts";

interface FilmProps {
    film: Film
}

const ratingMap : {[key: string] : string} = {
    "G": "0+",
    "PG": "6+",
    "PG13": "12+",
    "R": "16+",
    "NC17": "18+",
}

const FilmCard: React.FC<FilmProps> = ({film}) => {
    const navigate = useNavigate()
    const pathImg = "https://shift-intensive.ru/api" + film.img

    return (
        <div className={"class-card"}>
            <div className={"image-container"}>
                <img src={pathImg} alt={film.name}></img>
                <div>
                    <p>{film.genres[0]}</p>
                    <p>{film.country.name} {film.releaseDate.slice(film.releaseDate.length-4, film.releaseDate.length)}</p>
                </div>
            </div>


            <h3 className={"film-title"}>{film.name} ({ratingMap[film.ageRating]})</h3>
            <p className={"film-type"}>Фильм</p>
            <button className={"detail-button"} onClick={() => navigate(`/cinema/${film.name}`)}>Подробнее</button>
        </div>
    )
}

export default FilmCard