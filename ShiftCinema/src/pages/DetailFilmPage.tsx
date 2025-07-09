import Header from "../components/Header.tsx";
import {useNavigate, useParams} from "react-router";
import * as React from "react";
import {useEffect, useState} from "react";
import type {Film} from "../data/filmResponse.ts";
import {fetchFilmDetail} from "../api/filmDetailApi.ts";
import {toast} from "react-toastify";
import {fetchFilmSchedule} from "../api/filmSheduleApi.ts";
import type {FilmSchedule, Seance} from "../data/filmScheduleResponse.ts";
import {ImageLoader} from "../components/ImageLoader.tsx";
import {useQuery} from "@tanstack/react-query";
import "../styles/detail-film-page.css"
import ArrowBack from "../assets/arrow_back.svg?react"
import DaySelector from "../components/DaySelector.tsx";
import FilmScheduleDay from "../components/FilmScheduleDay.tsx";
import {renderStars} from "../utils/renderStars.tsx";
import {HOMEPAGE_PATH} from "../utils/routes.ts";

interface DayDisplayInfo extends FilmSchedule {
    dayLabel: string
}

interface OrganizedFilmSchedule {
    [date: string]: FilmSchedule
}

const ratingMap: { [key: string]: string } = {
    "G": "0+",
    "PG": "6+",
    "PG13": "12+",
    "R": "16+",
    "NC17": "18+",
}

const getDayLabel = (dateString: string): string => {
    const parts = dateString.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const fullYear = year < 100 ? 2000 + year : year;

    const date = new Date(fullYear, month, day);

    if (isNaN(date.getTime())) {
        console.warn(`Некорректный формат даты: ${dateString}. Пожалуйста, убедитесь, что дата в формате DD.MM.YY.`);
        return dateString;
    }

    const options: Intl.DateTimeFormatOptions = {weekday: 'short', day: 'numeric', month: 'short'};
    const formatted = new Intl.DateTimeFormat('ru-RU', options).format(date);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1).replace('.', '');
};


const DetailFilmPage = () => {
    const {filmId} = useParams<{ filmId: string }>()
    const [selectedDayDate, setSelectedDayDate] = useState<string>('')
    const [selectedSeance, setSelectedSeance] = useState<Seance | null>(null)

    const navigate = useNavigate();

    const handleSelectDay = (date: string): void => {
        setSelectedDayDate(date)
        setSelectedSeance(null)
    }

    const handleSelectSeance = (seance: Seance): void => {
        setSelectedSeance(seance)
    }


    const {data: film, isLoading: isFilmLoading, isError: isFilmError} = useQuery<Film>({
        queryKey: ["film", filmId],
        queryFn: () => fetchFilmDetail(filmId!),
        retry: 2,
        enabled: !!filmId,
        onError: (err) => {
            toast.error("Ошибка при получении деталей фильма")
            console.log(err)
        },

    })

    const {data: filmSchedule, isLoading: isScheduleLoading, isError: isScheduleError} = useQuery<FilmSchedule[]>({
        queryKey: ["filmSchedule", "filmSchedule"],
        queryFn: () => fetchFilmSchedule(filmId!),
        retry: 2,
        enabled: !!filmId,
        onError: (err) => {
            toast.error("Ошибка при получении расписания")
            console.log(err)
        },
    })

    const [organizedSchedules, setOrganizedSchedules] = useState<OrganizedFilmSchedule | null>(null)

    useEffect(() => {
        if (filmSchedule && filmSchedule.length > 0) {
            const organized: OrganizedFilmSchedule = {}
            filmSchedule.forEach((schedule) => {
                organized[schedule.date] = schedule
            })
            setOrganizedSchedules(organized)
            if (!selectedDayDate && Object.keys(organized).length > 0) {
                const firstDayDate = Object.keys(organized).sort()[0]
                setSelectedDayDate(firstDayDate)
            }
        } else if (filmSchedule && filmSchedule.length === 0) {
            setOrganizedSchedules({})
            setSelectedDayDate('')
            setSelectedSeance(null)
        }
    }, [filmSchedule, selectedDayDate])

    const daysForSeletor: DayDisplayInfo[] = organizedSchedules ? Object.values(organizedSchedules)
        .sort((a, b) => a.date.localeCompare(b.date))
        .map((schedule) => ({
            ...schedule,
            dayLabel: getDayLabel(schedule.date)
        })) : []

    const currentDaySeances: Seance[] | undefined = selectedDayDate && organizedSchedules
        ? organizedSchedules[selectedDayDate]?.seances
        : undefined

    if (isFilmLoading || isScheduleLoading) {
        return (
            <>
                <Header/>
                <div>
                    <p>Загрузка данных о фильме</p>
                </div>
            </>
        )
    }

    if (isFilmError || isScheduleError) {
        return (
            <>
                <Header/>
                <div>
                    <button onClick={() => navigate(HOMEPAGE_PATH)}></button>
                </div>
            </>
        )
    }

    return (
        <>
            <Header/>
            <div className="button-back-container">
                <ArrowBack/>
                <button onClick={() => navigate(HOMEPAGE_PATH)}>Назад</button>
            </div>
            <div className="film-detail">
                <div className="image-container-detail">
                    <ImageLoader url={`https://shift-intensive.ru/api${film.img}`}></ImageLoader>
                    <div className="on-image">
                        <p>{film.genres[0]}</p>
                        <p>{film.country.name} {film.releaseDate.slice(film.releaseDate.length - 4, film.releaseDate.length)}</p>
                    </div>
                </div>
                <div>
                    <h3 className="film-title-detail">{film.name} ({ratingMap[film.ageRating]})</h3>
                    <p className="film-type-detail">Фильм</p>
                    <div>
                        {renderStars(film.userRatings.kinopoisk)}
                    </div>
                    <p>Kinopoisk - {film.userRatings.kinopoisk}</p>
                    <p>{film.description}</p>
                </div>
            </div>
            <div className="schedule-section-header">
                <p>Расписание</p>
            </div>
            {daysForSeletor.length > 0 ? (
                <>
                    <DaySelector
                        days={daysForSeletor}
                        selectedDayDate={selectedDayDate}
                        onSelectDay={handleSelectDay}
                    />
                    <FilmScheduleDay
                        daySeances={currentDaySeances}
                        selectedTimeSlot={selectedSeance?.time}
                        selectedHallName={selectedSeance?.hall.name}
                        onSelectTime={handleSelectSeance}/>

                </>
            ) : (
                <div>
                    <p>Нет сеансов</p>
                </div>
            )}
        </>
    )
}

export default DetailFilmPage