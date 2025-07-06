interface ActorsDirectors {
    id: string
    professions: string
    fullName: string
}

interface Rating {
    kinopoisk: string
    imdb: string
}

interface Country {
    name: string
    code: string
    code2: string
    id: number
}

export interface Film {
    id: string
    name: string
    originalName: string
    description: string
    releaseDate: string
    actors: ActorsDirectors[]
    directors: ActorsDirectors[]
    runtime: number
    ageRating: string
    genres: string[]
    userRatings: Rating
    img: string
    country: Country
}

export interface FilmsResponse {
    success: boolean
    reason: string
    films: Film[]
}