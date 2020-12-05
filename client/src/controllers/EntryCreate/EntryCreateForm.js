import React, {useState, useCallback} from 'react'
import './EntryCreate.scss'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import {createEntryAction} from '../../redux/actions/post'
import {setErrorAction} from '../../redux/actions/page'

import Button from '../../components/Button/Button'
import { HiPlay, HiPencilAlt, HiVolumeUp, HiPhotograph } from "react-icons/hi";

const EntryCreateForm = props => {
    const [formInfo, setFormInfo] = useState({format_id:0})
    const [date, setDate] = useState()
    const {createEntry, setError} = props
    const {story, error} = props

    const history = useHistory()
    const gotoStory = useCallback(() => history.push(`/story/${story.id}`), [history, story])

    // creating drop down for days
    const dayOptions = []
    for(let i=1; i<=31; i++){
        dayOptions.push(<option key={i} value={i}> {i} </option>)
    }

    return (
        <>
            <h1>Add an Entry for {story.name}</h1>

            <div className='media-tabs'>
                <button
                    className={formInfo.format_id===1? 'active' : '' }
                    onClick={()=> setFormInfo( {...formInfo, format_id:1})}
                >
                <HiPlay/>
                <h2>Video</h2>
                </button>

                <button
                    className={formInfo.format_id===2? 'active' : '' }
                    onClick={()=> setFormInfo( {...formInfo, format_id:2})}
                >
                <HiPencilAlt/>
                <h2>Text</h2>
                </button>

                <button
                    className={formInfo.format_id===3? 'active' : '' }
                    onClick={()=> setFormInfo( {...formInfo, format_id:3})}
                >
                <HiVolumeUp/>
                <h2>Audio</h2>
                </button>

                <button
                    className={formInfo.format_id===4? 'active' : '' }
                    onClick={()=> setFormInfo( {...formInfo, format_id:4})}
                >
                <HiPhotograph/>
                <h2>Image</h2>
                </button>
            </div>


            <form>
                <input type='text' placeholder='Enter the embed link'
                    onChange={ e =>{
                        setFormInfo( {...formInfo, embed: e.target.value })
                    }}
                />

                <input type='text' placeholder='Enter the title'
                    onChange={ e =>{
                        setFormInfo( {...formInfo, title: e.target.value })
                    }}
                />

                <input type='text' placeholder='Enter the description'
                    onChange={ e =>{
                        setFormInfo( {...formInfo, description: e.target.value })
                    }}
                />

                <div className='date'>
                    <select name="months" className="months" onChange={e =>{
                            setDate({...date, month:e.target.value})
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
                        onChange={e =>setDate({...date, day:e.target.value})}
                    >
                        <option value="">Day:</option>
                        {dayOptions}
                    </select>

                    <input type='text' placeholder='Year'
                        onChange={ e =>{
                            setDate({...date, year:e.target.value})
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