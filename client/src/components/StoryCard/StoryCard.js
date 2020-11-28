import React from 'react'
import './StoryCard.scss'

import { HiOutlineXCircle } from "react-icons/hi";

const StoryCard = props => {

    const {imageUrl, name, occupation, specialStyle, onClick, deleteCard} = props

    return (
        <div
            className='storyCard'
            style={specialStyle}
            onClick={onClick}
            >
            {deleteCard? <div className='delete'> <HiOutlineXCircle/> </div>:''}

            <div
                className='profile-img'
                style={{backgroundImage:`url(${imageUrl})`, backgroundSize: 'cover'}}
            />
            <h1> {name} </h1>
            <h2> {occupation} </h2>
        </div>
    )
}

export default StoryCard