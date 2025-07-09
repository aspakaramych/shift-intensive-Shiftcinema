import type {FilmSchedule} from "../data/filmScheduleResponse.ts";
import React from "react";
import "../styles/day-selector-style.css"

interface DayDisplayInfo extends FilmSchedule {
    dayLabel: string
}

interface DaySelectorProps {
    days: DayDisplayInfo[]
    selectedDayDate: string
    onSelectDay: (date: string) => void
}

const DaySelector: React.FC<DaySelectorProps> = ({days, selectedDayDate, onSelectDay}) => {
    return (
        <div className="day-tabs">
            {days.map((day) => (
                <button key={day.date} onClick={() => onSelectDay(day.date)}
                        className={`day-tab ${selectedDayDate === day.date ? 'active' : ''}`}>{day.dayLabel}</button>
            ))}
        </div>
    )
}

export default DaySelector