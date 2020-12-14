import React,{useEffect} from 'react'
import './EntryCreate.scss'
import {useParams} from "react-router-dom";

import {connect} from 'react-redux'
import {getSingleStoryAction} from '../../redux/actions/db_get'

import EntryCreateForm from '../../components/EntryCreateForm/EntryCreateForm'
import GoHomeButton from '../../components/ButtonTypes/GoHomeButton/GoHomeButton'
import GoToStoryButton from '../../components/ButtonTypes/GoToStoryButton/GoToStoryButton'
import StoryCard from '../../components/StoryCard/StoryCard'

const EntryCreate = props => {

    const { storyId } = useParams()

    const {getSingleStory, current, user} = props

    useEffect(()=>{
        getSingleStory(storyId)
    }, [getSingleStory, storyId])

    if(!current || !current.story){
        return <div>no story to add an entry to</div>
    }
    const {story} = current

    return (
        <div className='entry-create'>
            <GoHomeButton/>
            <GoToStoryButton />

            <StoryCard {...{
                story: story,
                specialStyle:{margin:'0px auto', opacity:1},
                // deleteCard: ,
                // inTimeline:false
            }}/>

            {user? <EntryCreateForm story={story}/>: <h1>Please log in to add an entry.</h1>}
        </div>
    )
}

const mapStateToProps = state => {
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

export default connect(mapStateToProps, mapDispatchToProps)(EntryCreate)