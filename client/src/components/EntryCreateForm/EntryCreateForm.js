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

const EntryCreateForm = props => {
    // props from redux
    const {getSingleStory} = props
    const {current} = props

    // props from edit Entry
    const {edit, entry} = props

    // getting story
    const { storyId } = useParams()

    useEffect(()=>{
        getSingleStory(storyId)
    }, [getSingleStory, storyId])

    // form defaults
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

    // setting up for form visual validation
    const {format_id_F, embed_F, title_F, description_F} = formInfo
    const {month_F, day_F, year_F} = date
    const notFilledStyle = { border: '2px solid red'}

    if(!current || !current.story){
        return <div></div>
    }

    const  {story} = current

    return (
        <div className='entry-create-form'>
            {
                entry && entry.format_id === 4?
                <img alt={entry.title} src={formInfo.embed} />
                : ''
            }

            {
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