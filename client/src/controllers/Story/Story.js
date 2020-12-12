import React, {useState, useEffect} from 'react'
import './Story.scss'

import {connect} from 'react-redux'
import {useParams} from "react-router-dom"

import StoryCard from '../../components/StoryCard/StoryCard'
import TimelineCard from '../../components/TimelineCard/TimelineCard'
import ButtonsForStory from '../ButtonGroups/ButtonsForStory/ButtonsForStory'
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay'

import {getSingleStoryAction} from '../../redux/actions/db_get'

import {useCallback} from 'react'
import {useHistory} from 'react-router-dom'

const Story = props => {
    const {getSingleStory} = props
    const {current, path} = props

    const story = current? current.story : null
    const { storyId } = useParams()


    // START OF REDIRECT
    const history = useHistory()
    const goToProfile = useCallback(() => history.push(`/profile`), [history])
    const refresh = useCallback(() => history.go(0), [history])

    useEffect(()=>{
        if(path === 'deletedStory'){ goToProfile() }
        if(path === 'editedStory'){refresh()}
    },[path, goToProfile, refresh])
    // END OF REDIRECT

    useEffect(()=>{
        getSingleStory(storyId)
    }, [getSingleStory, storyId])

    // Progress Bar
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

    if(!story){ return <ErrorDisplay /> }
    else {
        return (
            <div className='timeline'>

                <ButtonsForStory {...{storyId}}/>

                <StoryCard
                    {...{
                        story: story,
                        specialStyle:{margin: '0px auto 50px auto', cursor:'auto', opacity:1},
                        inTimeline: true
                    }}
                />

                {createEntries(story)}

                <div className='progress-container'>
                    <div className='progress' style={{width: `${currentProgress}%`}} />
                </div>
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
    } else {
        entryComponents.push(<div key='0' className='notfound'> Seems this story doesn't have any entries yet. </div>)
    }

    return entryComponents
}

const mapStateToProps = (state, ownProps) => {
    return {
        current: state.page.current,
        user: state.profile.user,
        path: state.page.path
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSingleStory: storyId => dispatch(getSingleStoryAction(storyId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Story)