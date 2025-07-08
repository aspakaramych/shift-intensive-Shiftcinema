import type {Seance} from "../data/filmScheduleResponse.ts";
import React from "react";
import "../styles/schedule-day-style.css"

interface ScheduleDisplayProps {
    daySeances: Seance[]
    selectedTimeSlot: string
    selectedHallName: string
    onSelectTime?: (seance: Seance) => void
}

const FilmScheduleDay: React.FC<ScheduleDisplayProps> = ({
                                                             daySeances,
                                                             selectedTimeSlot,
                                                             selectedHallName,
                                                             onSelectTime
                                                         }) => {
    if (!daySeances || daySeances.length === 0) {
        return <div>Нет расписания для выбранного дня</div>
    }
    const hallsMap = new Map<string, Seance[]>();

    daySeances.forEach((seance) => {
        if (!hallsMap.has(seance.hall.name)) {
            hallsMap.set(seance.hall.name, [])
        }
        hallsMap.get(seance.hall.name)?.push(seance)
    })

    return (
        <div className={"schedule-section"}>
            {[...hallsMap.entries()].map(([hallName, seanceInHall]) => (
                <div key={hallName} className={"hall-section"}>
                    <h4>{hallName}</h4>
                    <div className={"time-slots"}>
                        {seanceInHall.sort((a, b) => a.time.localeCompare(b.time)).map((seance) => (
                            <button key={seance.time + seance.hall.name}
                                    onClick={() => onSelectTime && onSelectTime(seance)}
                                    className={`time-slot-button ${selectedTimeSlot === seance.time && selectedHallName === seance.hall.name ? 'selected' : ''}`}>{seance.time}</button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FilmScheduleDay