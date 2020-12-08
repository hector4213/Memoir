import React, {useCallback} from 'react'
import './StoryCard.scss'

import {connect} from 'react-redux'
import { useHistory } from "react-router-dom";
import { HiOutlineXCircle } from "react-icons/hi";
import {deleteStoryAction} from '../../redux/actions/delete'

const StoryCard = props => {
    const {story, specialStyle, deleteCard, inTimeline} = props
    const {deleteStory} = props

    const history = useHistory()
    const goToStory = useCallback(() => {
        const to = `/story/${story.id}`
        history.push(to)
    }, [history, story])

    if(!story){
        return <div></div>
    }

    return (
        // <Link to="/timeline">
        <div
            className='storyCard'
            style={specialStyle}
            onClick={inTimeline? ()=>{} : goToStory}
            >
            {
            deleteCard?
            <div className='delete' onClick={ e => {
                e.preventDefault()
                e.stopPropagation()
                // eslint-disable-next-line no-restricted-globals
                if (confirm(`Are you sure you want to delete ${story.name}'s story?`)) {
                    deleteStory(story.id)
                } else {
                    console.log('delete was cancelled')
                }
            }}>
            <HiOutlineXCircle/>
            </div>
            :''}

            <div
                className='profile-img'
                style={{backgroundImage:`url(${story.story_img})`, backgroundSize: 'cover'}}
            />
            <h1> {story.name} </h1>
            <h2> {story.occupation} </h2>
        </div>
        // </Link>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteStory: storyId => dispatch(deleteStoryAction(storyId))
    }
}

export default connect(null, mapDispatchToProps)(StoryCard)