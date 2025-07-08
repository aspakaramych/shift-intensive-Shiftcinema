import * as React from "react";
import {useNavigate} from "react-router";
import "../styles/class-card-style.css"
import type {Film} from "../data/filmResponse.ts";
import {ImageLoader} from "./ImageLoader.tsx";
import StarEmpty from "../assets/star_empty.svg?react"
import StarFull from "../assets/star_filled.svg?react"
import {renderStars} from "../utils/renderStars.tsx";

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
                <ImageLoader url={pathImg} ></ImageLoader>
                <div>
                    <p>{film.genres[0]}</p>
                    <p>{film.country.name} {film.releaseDate.slice(film.releaseDate.length-4, film.releaseDate.length)}</p>
                </div>
            </div>


            <h3 className={"film-title"}>{film.name} ({ratingMap[film.ageRating]})</h3>
            <p className={"film-type"}>Фильм</p>
            <div className={"rating-stars"}>
                {renderStars(film.userRatings.kinopoisk)}
            </div>
            <p className={"film-type"}>Kinopoisk - {film.userRatings.kinopoisk}</p>
            <button className={"detail-button"} onClick={() => navigate(`/cinema/${film.id}`)}>Подробнее</button>
        </div>
    )
}

export default FilmCard