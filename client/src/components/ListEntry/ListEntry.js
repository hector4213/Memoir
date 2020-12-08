import React, {useCallback} from 'react'
import './ListEntry.scss'
import {useHistory} from 'react-router-dom'

import { HiOutlineEye, HiOutlineEyeOff, HiOutlineXCircle } from "react-icons/hi";
import {connect} from 'react-redux'
import {deleteEntryAction} from '../../redux/actions/delete'

const ListEntry = props => {
    const {entry, belongsToOtherPerson} = props;
    const {deleteEntry} = props

    // this is for other's entries
    const visible = true
    const eye = visible? <HiOutlineEye/> : <HiOutlineEyeOff/>;
    // console.log(eye, belongsToOtherPerson)

    // redirects
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

            <HiOutlineXCircle className={'delete-btn'} onClick={ e => {
                e.preventDefault()
                e.stopPropagation()
                // eslint-disable-next-line no-restricted-globals
                if (confirm(`Are you sure you want to delete '${entry.title}' ?`)) {
                    deleteEntry(entry.story.id, entry.id)
                } else {
                    console.log('delete was cancelled')
                }
            }}/>
        </div>
    </div>
    )
}

const mapDispatchToProps = dispatch =>{
    return {
        deleteEntry: (storyId, entryId) => dispatch(deleteEntryAction(storyId, entryId))
    }
}

export default connect(null, mapDispatchToProps)(ListEntry)