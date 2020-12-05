import React, {useState, useCallback} from 'react'
import './EntryCreate.scss'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import {createEntryAction} from '../../redux/actions/post'
import {setErrorAction} from '../../redux/actions/page'

import Button from '../../components/Button/Button'
import { HiPlay, HiPencilAlt, HiVolumeUp, HiPhotograph } from "react-icons/hi";

const EntryCreateForm = props => {

    // form defaults
    const [formInfo, setFormInfo] = useState({
        format_id: 0,
        format_id_F: true,
        embed_F: true,
        title_F: true,
        description_F: true
    })

    const [date, setDate] = useState({
        month_F: true,
        day_F: true,
        year_F: true,
    })

    // setting up for form visual validation
    const {format_id_F, embed_F, title_F, description_F} = formInfo
    const {month_F, day_F, year_F} = date
    const notFilledStyle = { border: '2px solid red'}

    // props from redux
    const {createEntry, setError} = props
    const {story, error} = props

    // redirect to go to story
    const history = useHistory()
    const gotoStory = useCallback(() => history.push(`/story/${story.id}`), [history, story])

    // creating drop down for days
    const dayOptions = []
    for(let i=1; i<=31; i++){
        dayOptions.push(<option key={i} value={i}> {i} </option>)
    }

    return (
        <>
            <h1 className='actiontitle'>Add an Entry for {story.name}</h1>

            <div style={format_id_F?{}: notFilledStyle} className='media-tabs'>
                <button
                    className={formInfo.format_id===1? 'active' : '' }
                    onClick={()=> {
                        setFormInfo( {...formInfo, format_id:1, format_id_F:true})
                    }}
                >
                <HiPlay/>
                <h2>Video</h2>
                </button>

                <button
                    className={formInfo.format_id===2? 'active' : '' }
                    onClick={()=> setFormInfo( {...formInfo, format_id:2, format_id_F:true})}
                >
                <HiPencilAlt/>
                <h2>Text</h2>
                </button>

                <button
                    className={formInfo.format_id===3? 'active' : '' }
                    onClick={()=> setFormInfo( {...formInfo, format_id:3, format_id_F:true})}
                >
                <HiVolumeUp/>
                <h2>Audio</h2>
                </button>

                <button
                    className={formInfo.format_id===4? 'active' : '' }
                    onClick={()=> setFormInfo( {...formInfo, format_id:4, format_id_F:true})}
                >
                <HiPhotograph/>
                <h2>Image</h2>
                </button>
            </div>

            <form>
                <input style={embed_F? {} : notFilledStyle} type='text' placeholder='Enter the embed link'
                    onChange={ e =>{
                        if(e.target.value){
                            setFormInfo( {...formInfo, embed: e.target.value, embed_F:true })
                        } else {
                            setFormInfo( {...formInfo, embed: e.target.value, embed_F:false })
                        }
                    }}
                />

                <input style={title_F? {} : notFilledStyle} type='text' placeholder='Enter the title'
                    onChange={ e =>{
                        if(e.target.value){
                            setFormInfo( {...formInfo, title: e.target.value, title_F:true })
                        } else {
                            setFormInfo( {...formInfo, title: e.target.value, title_F:false })
                        }
                    }}
                />

                <input style={description_F? {} : notFilledStyle} type='text' placeholder='Enter the description'
                    onChange={ e =>{
                        if(e.target.value){
                            setFormInfo( {...formInfo, description: e.target.value, description_F:true })
                        } else {
                            setFormInfo( {...formInfo, description: e.target.value, description_F:false })
                        }
                    }}
                />

                <div className='date'>
                    <select name="months" className="months"
                        style={month_F?{}: notFilledStyle}
                        onChange={e =>{
                            if(e.target.value){
                                setDate({...date, month:e.target.value, month_F:true})
                            } else {
                                setDate({...date, month:e.target.value, month_F:false})
                            }
                        }}>
                        <option value="">Month:</option>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>

                    <select
                        name="days"
                        className="days"
                        style={day_F?{}: notFilledStyle}
                        onChange={e =>{
                            if(e.target.value){
                                setDate({...date, day:e.target.value, day_F:true})
                            } else {
                                setDate({...date, day:e.target.value, day_F:false})
                            }
                        }}
                    >
                        <option value="">Day:</option>
                        {dayOptions}
                    </select>

                    <input type='text' placeholder='Year'
                        style={year_F?{}: notFilledStyle}
                        onChange={ e =>{
                            if(e.target.value && !isNaN(e.target.value) && e.target.value.length===4){
                                setDate({...date, year:e.target.value, year_F:true})
                            } else {
                                setDate({...date, year:e.target.value, year_F:false})
                            }
                        }}
                    />
                </div>


                <Button {...{
                    label:'Submit',
                    transparent: false,
                    onClick: e => {
                        e.preventDefault()
                        const allFieldsCompleted = formInfo && formInfo.embed && formInfo.format_id && formInfo.title && formInfo.description && date && date.month && date.day && date.year

                        if(allFieldsCompleted){
                            const allFields = {...formInfo, date:`${date.month} ${date.day}, ${date.year}`}
                            createEntry(allFields)
                            setError(null)
                            gotoStory()
                        }
                        else {
                            setFormInfo({
                                ...formInfo,
                                embed_F: formInfo.embed? true: false,
                                format_id_F: formInfo.format_id? true: false,
                                title_F: formInfo.title? true: false,
                                description_F: formInfo.description? true: false,
                            })

                            setDate({
                                ...date,
                                month_F: date.month? true : false,
                                day_F: date.day? true : false,
                                year_F: date.year? true : false,
                            })

                            setError('All fields must be filled out')
                        }
                    }
                }}/>
            </form>

                {error?
                <div className='error'> {error} </div>: ''
                }
        </>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
        error: state.page.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createEntry: formInfo => dispatch(createEntryAction(formInfo)),
        setError: errorMessage => dispatch(setErrorAction(errorMessage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryCreateForm)