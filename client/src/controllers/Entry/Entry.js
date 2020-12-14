import React, {useEffect} from 'react'
import './Entry.scss'

import { useParams } from "react-router-dom";
import {connect} from 'react-redux'

import {getSingleEntryAction} from '../../redux/actions/entry'
import {getSingleStoryAction} from '../../redux/actions/story'
import ButtonsForEntry from '../ButtonGroups/ButtonsForEntry/ButtonsForEntry'

import {useCallback} from 'react'
import {useHistory} from 'react-router-dom'
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay';

const Entry = props => {
    const {getSingleEntry, getSingleStory} = props
    const {current} = props

    const { storyId, entryId } = useParams()

    const history = useHistory()
    const goToEntry = useCallback( id => history.push(`/story/${storyId}/entry/${id}`), [history, storyId])

    useEffect(()=>{
        getSingleEntry(storyId, entryId)
        getSingleStory(storyId)
    }, [getSingleEntry, getSingleStory, storyId, entryId])


    if(!current || !current.entry || !current.story || !current.entry){ return <ErrorDisplay /> }
    else {
        const entry = current.entry
        const {hashtags, format_id, title, description, embed, date, user, id} = entry


        const createMarkup = () => {
            return {__html: embed};
        }

        const [previousEntry, nextEntry] = getNavEntries(current.story.entries, id)
        const formattedDate = formatDate(date)

        // MEDIA TYPES: 1:VIDE0 , 2:TEXT , 3:AUDIO , 4:IMAGE
        return (
            <div className='single-entry'>

                <ButtonsForEntry />

                <div className='entry-container'>
                    {format_id === 1 || format_id === 3? <div dangerouslySetInnerHTML={createMarkup()} /> :''}
                    {format_id === 4? <img alt={title} src={embed}/>:''}
                    <div className='entry-caption'>
                        <h1>{title}</h1>
                        <h2>{formattedDate}</h2>
                        <p>{description}</p>
                        <p className='author'>This entry was written by: {user.username}</p>
                        {
                            hashtags.length > 0?
                                <>
                                <label>Tags: </label>
                                <ul className='hashtags'>
                                    {
                                    hashtags.map( (hash, i) => {
                                            return (<li key={i}> {hash.tagname} </li>)
                                    })
                                    }
                                </ul>
                                </> : ''
                            }
                    </div>

                    <div className='nav-entries' style={previousEntry? {} : {justifyContent:"flex-end"}} >
                        {
                        previousEntry?
                        <button
                            onClick={()=> goToEntry(previousEntry.id)}
                            className='previous-entry'
                            >
                            Previous Entry:<br/> {previousEntry.title}
                        </button> : ''
                        }
                        {
                        nextEntry?
                        <button
                            onClick={()=> goToEntry(nextEntry.id)}
                            className='next-entry'
                            >
                            Next Entry:<br/> {nextEntry.title}
                        </button> : ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const getNavEntries = (allEntries, entryId) =>{

    let back
    let next

    for(let i=0; i < allEntries.length; i++){
        if(entryId === allEntries[i].id){
            if(i>0){
                back = allEntries[i-1]
            }
            if(i<allEntries.length){
                next = allEntries[i+1]
            }
        }
    }

    return [back, next]
}

const formatDate = date => {
    const d = new Date(date)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

const mapStateToProps = state => {
    return {
        current: state.page.current,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSingleEntry: (storyId, entryId) => dispatch(getSingleEntryAction(storyId, entryId)),
        getSingleStory: storyId => dispatch(getSingleStoryAction(storyId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Entry)