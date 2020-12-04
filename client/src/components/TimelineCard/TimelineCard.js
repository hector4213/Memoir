import React from 'react'
import './TimelineCard.scss'
import './directions.scss'
import './mediaType.scss'

const TimelineCard = props => {

    // MEDIA TYPES: 1:VIDE0 , 2:TEXT , 3:AUDIO , 4:IMAGE

    const {entry, position} = props
    const {format_id, embed, title, date, description} = entry

    let timelineCardClass = 'entryRow '
    timelineCardClass += `${position} `

    let entryCardClasses = 'entryCard '
    entryCardClasses += `mediaType-${format_id} `

    const createMarkup = () => {
        return {__html: embed};
    }

    const line = () => {
        if(position === 'left' || position === 'right'){
            return format_id === 2 ? // TEXT
                    <div className='textHorizontalLine'>
                        <div className='timelineCircles lefttimelineCircle' />
                        <div className='timelineCircles righttimelineCircle' />
                    </div> :
                    <div className='horizontalLine'>
                        {
                            position === 'right'?
                            <div className='timelineCircles lefttimelineCircle' /> :
                            <div className='timelineCircles righttimelineCircle' />
                        }
                    </div>
        } else {
            return <div className='timelineCircles' />
        }
    }

    return (
        <div className={timelineCardClass}>
            <div className={`entryPositioner ${position}container mediaType-${format_id}container`}>
                <div className={entryCardClasses}>
                    {
                        format_id === 4 ? <img alt={title} src={embed}/> : '' // IMAGE
                    }

                    {
                        format_id === 1 || format_id === 3? // VIDEO OR AUDIO
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