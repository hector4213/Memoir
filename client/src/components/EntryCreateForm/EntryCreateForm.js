import React, {useState, useEffect} from 'react'
import './EntryCreateForm.scss'

import {connect} from 'react-redux'
import {useParams} from 'react-router-dom'

import {getSingleStoryAction} from '../../redux/actions/db_get'

import MediaType from './MediaType'
import DateEntry from './DateEntry'
import SubmitCreate from './SubmitCreate'
import TextEntry from './TextEntry'
import SubmitEdit from './SubmitEdit'

const EntryCreateForm = props => {
    // props from redux
    const {getSingleStory} = props
    const {current, error} = props

    // props from edit Entry
    const {edit, entry} = props

    // getting story
    const { storyId } = useParams()

    useEffect(()=>{
        getSingleStory(storyId)
    }, [getSingleStory, storyId])

    // form defaults
    const [formInfo, setFormInfo] = useState({
        format_id: edit? entry.format_id: 0,
        embed: edit? entry.embed : '',
        title: edit? entry.title: '',
        description: edit? entry.description: '',
        format_id_F: true,
        embed_F: true,
        title_F: true,
        description_F: true
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
                edit?
                <>
                <img alt={entry.title} src={formInfo.embed} />
                <h1 className='actiontitle'>Edit this Entry</h1>
                </>
                :
                <h1 className='actiontitle'>Add an Entry for {story.name}</h1>
            }

            <form>
                <MediaType {...{format_id_F, setFormInfo, formInfo, notFilledStyle}}/>
                <TextEntry {...{setFormInfo, notFilledStyle, formInfo, embed_F, title_F, description_F}} />
                <DateEntry {...{month_F, notFilledStyle, setDate, date, day_F, year_F}} />

                {
                    edit ?
                    <SubmitEdit {...{ setFormInfo, formInfo, setDate, date }} />
                    :
                    <SubmitCreate {...{ setFormInfo, formInfo, setDate, date }} />
                }
            </form>

            {error ? <div className='error'> {error} </div>: ''}
        </div>
    )
}


const mapStateToProps = state => {
    return {
        error: state.page.error,
        current: state.page.current
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSingleStory: storyId => dispatch(getSingleStoryAction(storyId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryCreateForm)