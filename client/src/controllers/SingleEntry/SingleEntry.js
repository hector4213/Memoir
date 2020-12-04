import React, {useEffect, useCallback} from 'react'
import './SingleEntry.scss'

import { useParams, useHistory } from "react-router-dom";
import {connect} from 'react-redux'

import {getSingleEntryAction} from '../../redux/actions/get'
import HomeButton from '../../components/HomeButton/HomeButton'
import Button from '../../components/Button/Button';

const SingleEntry = props => {
    const {getSingleEntry} = props
    const {current} = props

    const { storyId, entryId } = useParams()
    useEffect(()=>{
        getSingleEntry(storyId, entryId)
    }, [getSingleEntry, storyId, entryId])

    const history = useHistory()
    const goToStory = useCallback(() => {
        const to = `/story/${storyId}`
        console.log(to)
        history.push(to)
    }, [history, storyId])

    if(!current || !current.entry){ return <div> This entry does not exist </div> }
    else {
        const entry = current.entry[0]
        console.log(entry)
        return (
            <div className='single-entry'>
                <HomeButton />
                <Button {...{ label:'Back to Story', onClick:goToStory, transparent:true, extraClass:'gotostory-btn' }}/>
                <h1>{entry.title}</h1>
                <p>{entry.title}</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
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