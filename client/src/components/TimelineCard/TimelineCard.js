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

    const createMarkup = () => {
        return {__html: mediaUrl};
    }

    const line = () => {
        if(position === 'left' || position === 'right'){
            return mediaType === 'text'?
                    <div className='textHorizontalLine'>
                        <div className='timelineCircles lefttimelineCircle' />
                        <div className='timelineCircles righttimelineCircle' />
                    </div> :
                    <div className='horizontalLine' />
        } else {
            return <div className='timelineCircles' />
        }
    }

    return (
        <div className={timelineCardClass}>
            <div className={`entryPositioner ${position}container ${mediaType}container`}>
                <div className={entryCardClasses}>
                    {mediaType === 'picture'? <img alt={title} src={mediaUrl}/> : ''}

                    {
                        mediaType === 'video' || mediaType === 'sound'?
                        <div dangerouslySetInnerHTML={createMarkup()} /> : ''
                    }
                    <div className='caption'>
                        <h1>{title}</h1>
                        <h2>{date}</h2>
                        {description? <p>{description}</p> : ''}
                    </div>
                </div>

                {line()}
            </div>

        </div>
    )
}

export default TimelineCard