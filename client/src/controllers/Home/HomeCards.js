import React from 'react'
import './HomeCards.scss'

import StoryCard from '../../components/StoryCard/StoryCard'

const HomeCards = props => {
    const {stories} = props

    let cards = []

    if(stories){
        stories.forEach((story, i) => {
            cards.push(
                <StoryCard
                    {...{
                        key: i,
                        story: story
                    }}
                />
            )
        })
    }

    return (
        <div className='storyCards'>
            {cards}
        </div>
    )
}

export default HomeCards