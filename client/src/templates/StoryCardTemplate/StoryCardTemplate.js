import React from 'react'
import './StoryCardTemplate.scss'

const StoryCardTemplate = props => {

    const {story} = props

    return (
        <div className='storycard-template'>
            <div
                className='profile-img'
                style={{backgroundImage:`url(${story.story_img})`, backgroundSize: 'cover'}}
            />

            <h1> {story.name} </h1>
            <h2> {story.occupation} </h2>
        </div>
    )
}

export default StoryCardTemplate