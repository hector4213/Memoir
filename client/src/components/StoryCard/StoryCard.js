import React from 'react'
import './StoryCard.scss'

const StoryCard = props => {

    const {imageUrl, name, occupation, specialStyle, onClick} = props

    return (
        <div
            className='storyCard'
            style={specialStyle}
            onClick={onClick}
            >
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