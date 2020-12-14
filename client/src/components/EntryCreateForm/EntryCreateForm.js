import React, {useState, useEffect} from 'react'
import './EntryCreateForm.scss'

import {connect} from 'react-redux'
import {useParams} from 'react-router-dom'

import {getSingleStoryAction} from '../../redux/actions/db_get'

import MediaType from './fields/Embed/MediaType'
import DateEntry from './fields/Date/DateEntry'
import SubmitCreate from './fields/Submit/SubmitCreate'
import TextEntry from './fields/Text/TextEntry'
import SubmitEdit from './fields/Submit/SubmitEdit'
import TagsEntry from './fields/Tags/TagsEntry'
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay'

const EntryCreateForm = props => {

    const {getSingleStory} = props
    const {current} = props
    const {edit, entry} = props

    const { storyId } = useParams()

    useEffect(()=>{
        getSingleStory(storyId)
    }, [getSingleStory, storyId])

    const [formInfo, setFormInfo] = useState({
        format_id: entry && entry.format_id? entry.format_id: 0,
        embed: entry && entry.embed? entry.embed : '',
        title: entry && entry.title? entry.title: '',
        description: entry && entry.description? entry.description: '',
        hashtags: entry && entry.hashtags? entry.hashtags : '',
        format_id_F: true,
        embed_F: true,
        title_F: true,
        description_F: true,
    })

    let editDate
    if(edit){
        editDate = new Date(entry.date)
    }

    const [date, setDate] = useState({
        month: edit?  editDate.getMonth()+1 : '' ,
        day: edit?  editDate.getDate() : '',
        year: edit?  editDate.getFullYear() : '',
        month_F: true,
        day_F: true,
        year_F: true,
    })

    const {format_id_F, embed_F, title_F, description_F} = formInfo
    const {month_F, day_F, year_F} = date
    const notFilledStyle = { border: '2px solid red'}

    if(!current || !current.story){
        return <ErrorDisplay message= 'There isnt a story to write an entry to' />
    }

    const {story} = current

    return (
        <div className='entry-create-form'>
            {
                // IF IMAGE
                entry && entry.format_id === 4?
                <img alt={entry.title} src={formInfo.embed} />
                : ''
            }

            {
                // IF ON EDIT PAGE
                edit?
                <h1 className='actiontitle'>Edit {story.name}'s Entry</h1> :
                <h1 className='actiontitle'>Add an Entry for {story.name}</h1>
            }

            <form>
                <MediaType {...{format_id_F, setFormInfo, formInfo, notFilledStyle}}/>
                <TextEntry {...{setFormInfo, notFilledStyle, formInfo, embed_F, title_F, description_F}} />
                <DateEntry {...{month_F, notFilledStyle, setDate, date, day_F, year_F}} />
                <TagsEntry {...{formInfo, setFormInfo}} />

                {
                    // IF ON EDIT PAGE
                    edit ?
                    <SubmitEdit {...{ setFormInfo, formInfo, setDate, date }} />
                    :
                    <SubmitCreate {...{ setFormInfo, formInfo, setDate, date }} />
                }
            </form>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        current: state.page.current
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSingleStory: storyId => dispatch(getSingleStoryAction(storyId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryCreateForm)