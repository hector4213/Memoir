import React, {useEffect} from 'react'
import './SingleEntry.scss'

import { useParams } from "react-router-dom";
import {connect} from 'react-redux'

import {getSingleEntryAction} from '../../redux/actions/get'

const SingleEntry = props => {
    const {getSingleEntry} = props
    const {current} = props

    const { storyId, entryId } = useParams()
    useEffect(()=>{
        getSingleEntry(storyId, entryId)
    }, [getSingleEntry, storyId, entryId])

    if(!current || !current.entry){ return <div> This entry does not exist </div> }
    else {
        const entry = current.entry[0]
        console.log(entry)
        return (
            <div className='single-entry'>
                <h1>{entry.title}</h1>
                <p>{entry.title}</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        current: state.page.current
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSingleEntry: (storyId, entryId) => dispatch(getSingleEntryAction(storyId, entryId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleEntry)