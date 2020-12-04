import React, {useCallback} from 'react'
import './StoryCard.scss'

import {connect} from 'react-redux'

import { useHistory } from "react-router-dom";

import { HiOutlineXCircle } from "react-icons/hi";

const StoryCard = props => {
    const {story, specialStyle, deleteCard, inTimeline} = props

    const history = useHistory()
    const onClick = useCallback(() => {
        const to = `/timeline/${story.id}`
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
            onClick={inTimeline? ()=>{} : onClick}
            >
            {deleteCard? <div className='delete'> <HiOutlineXCircle/> </div>:''}

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

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryCard)