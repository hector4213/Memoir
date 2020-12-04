import React, {useState, useEffect} from 'react'
import './Timeline.scss'
import {connect} from 'react-redux'
import {useParams } from "react-router-dom";

import StoryCard from '../../components/StoryCard/StoryCard'
import TimelineCard from '../../components/TimelineCard/TimelineCard'

import {getSingleStoryAction} from '../../redux/actions/get'
import HomeButton from '../../components/HomeButton/HomeButton';

const Timeline = props => {
    const {getSingleStory} = props
    const {current} = props

    const story = current? current.story : null
    const { storyId } = useParams()

    useEffect(()=>{
        getSingleStory(storyId)
    }, [getSingleStory, storyId])

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
        return <div className='notfound'> Sorry we could not find that story. </div>
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
            entryComponents.push(<div className='notfound'> Seems this story doesn't have any entries yet. </div>)
        }

        return (
            <div className='timeline'>
                <HomeButton />

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
    console.log(state)
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