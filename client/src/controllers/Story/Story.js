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
import FilterNav from './FilterNav/FilterNav'

const Story = props => {
    const {getSingleStory} = props
    const {current} = props

    const [filter, setFilter] = useState(null)

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
        const total = (current/height)*100

        setCurrentProgress( total )
    }

    if(!story){ return <ErrorDisplay /> }
    else {


        const viewableEntries = () => {
            if(filter){
                const filteredStories = story.entries.filter(entry => entry.format_id === filter)
                return createTimelineCards(filteredStories)
            }
            else {
                return createTimelineCards(story.entries)
            }
        }


        return (
            <div className='timeline'>

                <ButtonsForStory {...{storyId}}/>

                <StoryCard {...{
                    story: story,
                    specialStyle:{margin: '0px auto 50px auto', cursor:'auto', opacity:1, maxWidth:'200px'},
                    inTimeline: true
                }}/>

                {
                    story.entries.length > 0?
                    <>
                    <InspiringButton />
                    <FilterNav filter={filter} setFilter={setFilter} />

                    {viewableEntries()}

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

const createTimelineCards = entries =>{
    let entryComponents = []

    if(entries.length > 0){
        entries.forEach( (entry, i) => {
            let position
            if(i === 0){ position = 'top' }   // first entry
            else if(i === entries.length -1){ position = 'bottom' }   // last entry
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
    console.log(state)
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