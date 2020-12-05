import React, {useCallback} from 'react'
import './ListEntry.scss'
import {useHistory} from 'react-router-dom'

import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const ListEntry = props => {

    const {entry, belongsToOtherPerson} = props;
    console.log('entry', entry)
    const visible = true
    const eye = visible? <HiOutlineEye/> : <HiOutlineEyeOff/>;


    const history = useHistory()
    const goToEntry = useCallback(() => history.push(`/story/${entry.story_id}/entry/${entry.id}`), [history, entry])
    const goToStory = useCallback(() => history.push(`/story/${entry.story_id}`), [history, entry])

    return (
    <div className='listEntry' onClick={goToEntry}>
        <h1>{entry.title}</h1>
        <div className='listEntryRight'>
            <h2 onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                goToStory()
            }}>{entry.story.name}</h2>
            {belongsToOtherPerson? '' : eye}
        </div>
    </div>
    )
}

export default ListEntry