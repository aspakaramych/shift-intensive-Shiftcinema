interface Ticket {
    type: string
    price: number
}

interface Hall {
    name: string
    places: Ticket[]
}

interface Seance {
    time: string
    hall: Hall
}


export interface FilmSchedule {
    date: string
    seances: Seance[]
}

export interface ScheduleResponse {
    success: string
    reason: string
    schedules: FilmSchedule
}