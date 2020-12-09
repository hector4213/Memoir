import React, {useEffect} from 'react'
import './Entry.scss'

import { useParams } from "react-router-dom";
import {connect} from 'react-redux'

import {getSingleEntryAction, getSingleStoryAction} from '../../redux/actions/db_get'
import GoHomeButton from '../../components/ButtonTypes/GoHomeButton/GoHomeButton'
import GoToStoryButton from '../../components/ButtonTypes/GoToStoryButton/GoToStoryButton'
import ButtonsForEntry from '../../components/ButtonGroups/ButtonsForEntry/ButtonsForEntry';

import {useCallback} from 'react'
import {useHistory} from 'react-router-dom'

const Entry = props => {
    const {getSingleEntry, getSingleStory} = props
    const {current, path, loggedInUser} = props

    const { storyId, entryId } = useParams()

    // START OF REDIRECT
    const history = useHistory()
    const refresh = useCallback(() => history.go(0), [history])
    const goToEntry = useCallback( id => history.push(`/story/${storyId}/entry/${id}`), [history, storyId])

    useEffect(()=>{
        if(path === 'editedEntry'){ refresh() }
    },[path, refresh])
    // END OF REDIRECT

    useEffect(()=>{
        getSingleEntry(storyId, entryId)
        getSingleStory(storyId)
    }, [getSingleEntry, getSingleStory, storyId, entryId])


    if(!current || !current.entry || !current.story || !current.entry){ return <div> This entry does not exist </div> }
    else {
        const entry = current.entry
        const {format_id, title, description, embed, date, user, id} = entry

        // NEED THIS TO EMBED IFRAME FOR VIDEO AND AUDIO
        // STILL HAVE NOT WORKED ON IT NEED TO ADJUST BACKEND
        // BECAUSE OF STRING SIZE LIMITATION IN EMBED
        // const createMarkup = () => {
        //     return {__html: embed};
        // }

        const [previousEntry, nextEntry] = getNavEntries(current.story.entries, id)
        const formattedDate = formatDate(date)

        // MEDIA TYPES: 1:VIDE0 , 2:TEXT , 3:AUDIO , 4:IMAGE
        return (
            <div className='single-entry'>
                <GoHomeButton />
                <GoToStoryButton />
                {loggedInUser? <ButtonsForEntry />: ''}

                <div className='entry-container'>
                    {format_id === 1 || format_id === 3? 'this is a video or audio that will be embeded once i have real embeds' :''}
                    {/* {format_id === 1 || format_id === 3? <div dangerouslySetInnerHTML={createMarkup()} /> :''} */}
                    {format_id === 4? <img alt={title} src={embed}/>:''}
                    <div className='entry-caption'>
                        <h1>{title}</h1>
                        <h2>{formattedDate}</h2>
                        <p>{description}</p>
                        <p>This entry was written by: {user.username}</p>
                    </div>

                    <div className='nav-entries'>
                        {previousEntry? <button onClick={()=> goToEntry(previousEntry.id)}> Previous Entry:<br/> {previousEntry.title}</button> : ''}
                        {nextEntry? <button onClick={()=> goToEntry(nextEntry.id)}> Next Entry:<br/> {nextEntry.title}</button> : ''}
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
        loggedInUser: state.profile.user,
        path: state.page.path
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSingleEntry: (storyId, entryId) => dispatch(getSingleEntryAction(storyId, entryId)),
        getSingleStory: storyId => dispatch(getSingleStoryAction(storyId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Entry)