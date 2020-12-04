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

    // Route to go home
    const history = useHistory()
    const goHome = useCallback(() => {
        const to = `/`
        history.push(to)
    }, [history])

    // Progress Bar
    const [currentProgress, setCurrentProgress] = useState(0)
    useEffect(()=>{
        window.addEventListener('scroll', e => {
            const height = document.body.clientHeight - window.innerHeight
            const current= window.scrollY
            setCurrentProgress( (current/height)*100 )
        })
    }, [])

    if(!story){
        return <div> Sorry we could not find that story. </div>
    } else {
        const entryComponents = []
        if(story.entries.length > 0){
            story.entries.forEach( (entry, i) => {
                let position
                if(i === 0){ position = 'top' }   // first entry
                else if(i === story.entries.length -1){ position = 'bottom' }   // last entry
                else {   // middle entries
                    if(i%2 === 0){ position = 'left' }
                    else { position = 'right' }
                }

                entryComponents.push(
                    <TimelineCard
                        {...{
                            key: `entry_${entry.id}`,
                            position: position,
                            entry: entry
                        }}
                    />
                )
            })
        } else {
            entryComponents.push(<div className='no-stories'> Seems this story doesn't have any entries yet. </div>)
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