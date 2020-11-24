import React from 'react'
import './Timeline.scss'

import StoryCard from '../../components/StoryCard/StoryCard'
import TimelineCard from '../../components/TimelineCard/TimelineCard'

const Timeline = props => {
    return (
        <div className='timeline'>
            <StoryCard
                {...{
                    imageUrl:'https://tinyurl.com/y5qnh2ey',
                    name:'Carl Fredricksen',
                    occupation:'Balloon Salesman',
                    specialStyle:{margin: 'auto'},
                    onClick: ()=>console.log('Clicked the old man')
                }}
            />

            <TimelineCard
                {...{
                    position: 'top',
                    mediaType: 'text',
                    title: 'My First Balloon',
                    date: 'December 25, 1900',
                    description: 'On Christmas I got my first balloon.'
                }}
            />

            <TimelineCard
                {...{
                    position: 'left',
                    mediaType: 'text',
                    title: 'My First Balloon',
                    date: 'December 25, 1900',
                    description: 'On Christmas I got my first balloon.'
                }}
            />

            <TimelineCard
                {...{
                    position: 'right',
                    mediaType: 'text',
                    title: 'My First Balloon',
                    date: 'December 25, 1900',
                    description: 'On Christmas I got my first balloon.'
                }}
            />
        </div>
    )
}

export default Timeline