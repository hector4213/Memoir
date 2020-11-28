import React, {useCallback} from 'react'
import './Timeline.scss'

import { useHistory } from "react-router-dom";

import Button from '../../components/Button/Button'
import StoryCard from '../../components/StoryCard/StoryCard'
import TimelineCard from '../../components/TimelineCard/TimelineCard'

const Timeline = props => {

    const history = useHistory()
    const onClick = useCallback(() => {
        const to = `/`
        history.push(to)
    }, [history])

    return (
        <div className='timeline'>
            <Button onClick= {onClick}
                {...{
                    label: 'Back',
                    transparent : true,
                    extraClass: 'back-btn',
                }}
            />

            <StoryCard
                {...{
                    imageUrl:'https://tinyurl.com/y5qnh2ey',
                    name:'Carl Fredricksen',
                    occupation:'Balloon Salesman',
                    specialStyle:{margin: 'auto'},
                    inTimeline: true
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
                    mediaType: 'video',
                    mediaUrl: '<iframe width="560" height="315" src="https://www.youtube.com/embed/AkdXuDAP2Ts" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                    title: 'Up was released',
                    date: 'May 29, 2009',
                    description: 'My movie came out in 2009 !'
                }}
            />

            <TimelineCard
                {...{
                    position: 'right',
                    mediaType: 'picture',
                    mediaUrl: 'https://i.pinimg.com/originals/2a/eb/72/2aeb72d9996ed41ca8d58092507e7ee8.jpg',
                    title: 'I Met Ellie',
                    date: 'February 14, 1929',
                    description: 'On Valentines Day I met Ellie for the very first time.'
                }}
            />

            <TimelineCard
                {...{
                    position: 'bottom',
                    mediaType: 'sound',
                    mediaUrl: '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/200576273&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>',
                    title: 'Ellie\'s Theme',
                    date: 'January 25, 1999',
                    description: 'Our song.'
                }}
            />

            <div className='progress'>

            </div>
        </div>
    )
}

export default Timeline