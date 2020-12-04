import React, {useCallback, useState, useEffect} from 'react'
import './Timeline.scss'
import {connect} from 'react-redux'
import { useHistory, useParams } from "react-router-dom";

import Button from '../../components/Button/Button'
import StoryCard from '../../components/StoryCard/StoryCard'
import TimelineCard from '../../components/TimelineCard/TimelineCard'

import {getSingleStoryAction} from '../../redux/actions/get'

const Timeline = props => {
    const {getSingleStory} = props
    const {current} = props

    const story = current? current.story : null
    const { storyId } = useParams()

    useEffect(()=>{
        getSingleStory(storyId)
    }, [getSingleStory, storyId])

    const history = useHistory()
    const goHome = useCallback(() => {
        const to = `/`
        history.push(to)
    }, [history])

    const [currentProgress, setCurrentProgress] = useState(0)
    window.addEventListener('scroll', e => {
        const height = document.body.clientHeight - window.innerHeight
        const current= window.scrollY
        setCurrentProgress( (current/height)*100 )
    })

    if(!story){
        return <div> Sorry we could not find that story. </div>
    } else {
        const entryComponents = []

        if(story.entries.length > 0){
            story.entries.forEach( (entry, i) => {
                if(i === 0){ // first entry
                    entryComponents.push(<TimelineCard
                    {...{
                        key: `entry_${entry.id}`,
                        position: 'top',
                        mediaType: 'text',
                        // mediaType: entry.formatID,
                        title: entry.title,
                        date: entry.date,
                        description: entry.description
                    }} />)
                }
                else if(i === story.entries.length -1){ // last entry
                    entryComponents.push(<TimelineCard
                    {...{
                        key: `entry_${entry.id}`,
                        position: 'bottom',
                        mediaType: 'text',
                        // mediaType: entry.formatID,
                        title: entry.title,
                        date: entry.date,
                        description: entry.description
                    }} />)
                }
                else { // middle entries
                    if(i%2 === 0){
                        entryComponents.push(<TimelineCard
                            {...{
                                key: `entry_${entry.id}`,
                                position: 'left',
                                mediaType: 'text',
                                // mediaType: entry.formatID,
                                title: entry.title,
                                date: entry.date,
                                description: entry.description
                            }} />)
                    } else {
                        entryComponents.push(<TimelineCard
                            {...{
                                key: `entry_${entry.id}`,
                                position: 'right',
                                mediaType: 'text',
                                // mediaType: entry.formatID,
                                title: entry.title,
                                date: entry.date,
                                description: entry.description
                            }} />)
                    }
                }
            })
        }

        return (
            <div className='timeline'>
                <Button
                    {...{
                        label: 'Home',
                        transparent : true,
                        extraClass: 'back-btn',
                        onClick: goHome
                    }}
                />

                <StoryCard
                    {...{
                        story: story,
                        specialStyle:{margin: 'auto'},
                        inTimeline: true
                    }}
                />

                {entryComponents}

                <div className='progress-container'>
                    <div className='progress' style={{width: `${currentProgress}%`}} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        current: state.page.current
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSingleStory: storyId => dispatch(getSingleStoryAction(storyId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)