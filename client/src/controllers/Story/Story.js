import React, {useState, useEffect} from 'react'
import './Story.scss'

import {connect} from 'react-redux'
import {useParams} from "react-router-dom"

import StoryCard from '../../components/StoryCard/StoryCard'
import TimelineCard from '../../components/TimelineCard/TimelineCard'
import ButtonsForStory from '../ButtonGroups/ButtonsForStory/ButtonsForStory'
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay'

import {getSingleStoryAction} from '../../redux/actions/story'
import InspiringButton from '../../components/ButtonTypes/InspiringButton/InspiringButton'

const Story = props => {
    const {getSingleStory} = props
    const {current} = props

    const story = current? current.story : null
    const { storyId } = useParams()

    useEffect(()=> getSingleStory(storyId), [getSingleStory, storyId])

    // PROGRESS BAR
    const [currentProgress, setCurrentProgress] = useState(0)
    useEffect(()=>{
        window.addEventListener('scroll', changeProgress)

        return () => {
            window.removeEventListener('scroll', changeProgress)
        }
    }, [])

    const changeProgress = e => {
        e.preventDefault()
        const height = document.body.clientHeight - window.innerHeight
        const current= window.scrollY

        setCurrentProgress( (current/height)*100 )
    }


    // START DISPLAYING STORY
    if(!story){ return <ErrorDisplay /> }
    else {
        return (
            <div className='timeline'>

                <ButtonsForStory {...{storyId}}/>

                <StoryCard
                    {...{
                        story: story,
                        specialStyle:{margin: '0px auto 50px auto', cursor:'auto', opacity:1, maxWidth:'200px'},
                        inTimeline: true
                    }}
                />

                {
                    story.entries.length > 0?
                    <>
                    <InspiringButton />
                    {createEntries(story)}
                    <div className='progress-container'>
                        <div className='progress' style={{width: `${currentProgress}%`}} />
                    </div>
                    </>
                    :
                    <ErrorDisplay
                        message={`Seems ${story.name} doesn't have any entries yet`}
                    />
                }
            </div>
        )
    }
}

const createEntries = story =>{
    let entryComponents = []

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
    } else {}

    return entryComponents
}

const mapStateToProps = (state, ownProps) => {
    return {
        current: state.page.current,
        user: state.profile.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSingleStory: storyId => dispatch(getSingleStoryAction(storyId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Story)