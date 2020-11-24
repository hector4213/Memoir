import React from 'react'
import './TimelineCard.scss'
import './directions.scss'
import './mediaType.scss'

const TimelineCard = props => {

    // types of cards T-top R-right and L-left
    // media type sets different styles Picture, Video, Sound, and Text
    const {position, mediaType, mediaUrl, title, date, description} = props

    let timelineCardClass = 'entryRow '
    timelineCardClass += `${position} `

    let entryCardClasses = 'entryCard '
    entryCardClasses += `${mediaType} `
    if(position === 'left' || position === 'right'){
        return (
            <div className={timelineCardClass}>
                <div className={`entryPositioner ${position}container`}>
                    <div className={entryCardClasses}>
                        {mediaUrl? <img alt={title} src={mediaUrl}/> : ''}
                        <h1>{title}</h1>
                        <h2>{date}</h2>
                        {description? <p>{description}</p> : ''}
                    </div>

                    <div className='horizontalLine'>
                        <div className='timelineCircles lefttimelineCircle' />
                        <div className='timelineCircles righttimelineCircle' />
                    </div>
                </div>

            </div>
        )
    }
    else {
        return (
            <div className={timelineCardClass}>
                <div className={`entryPositioner ${position}container`}>
                    <div className={entryCardClasses}>
                        {mediaUrl? <img alt={title} src={mediaUrl}/> : ''}
                        <h1>{title}</h1>
                        <h2>{date}</h2>
                        {description? <p>{description}</p> : ''}
                    </div>
                </div>

                <div className='timelineCircles' />
            </div>
        )
    }
}

export default TimelineCard