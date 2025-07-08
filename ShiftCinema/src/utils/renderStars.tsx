import StarEmpty from "../assets/star_empty.svg?react"
import StarFull from "../assets/star_filled.svg?react"
import React from "react";

export const renderStars = (ratingString: string) : React.ReactElement[] => {
    const stars : React.ReactElement[] = []
    const rating = parseFloat(ratingString)
    if (isNaN(rating)){
        for (let i = 0; i < 5; i++){
            stars.push(<StarEmpty key={i} />)
        }
        return stars
    }
    const fullStars = Math.floor(rating / 2)
    for (let i = 0; i < fullStars; i++){
        stars.push(<StarFull key={i}/>)
    }
    for (let i = stars.length; i < 5; i++) {
        stars.push(<StarEmpty key={i} />)
    }
    return stars
}