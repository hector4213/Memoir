import React, {useCallback} from 'react'
import './StoryCard.scss'

import { useHistory } from "react-router-dom";

import { HiOutlineXCircle } from "react-icons/hi";

const StoryCard = props => {

    const {imageUrl, name, occupation, specialStyle, deleteCard, inTimeline} = props
    // const {imageUrl, name, occupation, specialStyle, onClick, deleteCard} = props

    const history = useHistory()
    const onClick = useCallback(() => {
        const to = `/timeline`
        history.push(to)
    }, [history])

    return (
        // <Link to="/timeline">
        <div
            className='storyCard'
            style={specialStyle}
            onClick={inTimeline? '' : onClick}
            >
            {deleteCard? <div className='delete'> <HiOutlineXCircle/> </div>:''}

            <div
                className='profile-img'
                style={{backgroundImage:`url(${imageUrl})`, backgroundSize: 'cover'}}
            />
            <h1> {name} </h1>
            <h2> {occupation} </h2>
        </div>
        // </Link>
    )
}

export default StoryCard