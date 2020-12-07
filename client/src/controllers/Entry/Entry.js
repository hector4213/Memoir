import React, {useEffect} from 'react'
import './Entry.scss'

import { useParams } from "react-router-dom";
import {connect} from 'react-redux'

import {getSingleEntryAction} from '../../redux/actions/get'
import GoHomeButton from '../../components/ButtonTypes/GoHomeButton/GoHomeButton'
import GoToStoryButton from '../../components/ButtonTypes/GoToStoryButton/GoToStoryButton'

const Entry = props => {
    const {getSingleEntry} = props
    const {current} = props

    const { storyId, entryId } = useParams()

    useEffect(()=>{
        getSingleEntry(storyId, entryId)
    }, [getSingleEntry, storyId, entryId])


    if(!current || !current.entry){ return <div> This entry does not exist </div> }
    else {
        const entry = current.entry[0]
        const {format_id, title, description, embed, date, user} = entry

        // const createMarkup = () => {
        //     return {__html: embed};
        // }

        const d = new Date(date)
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const formattedDate = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`

        // MEDIA TYPES: 1:VIDE0 , 2:TEXT , 3:AUDIO , 4:IMAGE
        return (
            <div className='single-entry'>
                <GoHomeButton />
                <GoToStoryButton />

                <div className='entry-container'>
                    {format_id === 1 || format_id === 3? 'this is a video or audio that will be embeded once i have real embeds' :''}
                    {/* {format_id === 1 || format_id === 3? <div dangerouslySetInnerHTML={createMarkup()} /> :''} */}
                    {format_id === 4? <img alt={title} src={embed}/>:''}
                    <div className='entry-caption'>
                        <h1>{title}</h1>
                        <h2>{formattedDate}</h2>
                        <p>{description}</p>
                    </div>
                    <p>This entry was written by: {user.username}</p>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Entry)