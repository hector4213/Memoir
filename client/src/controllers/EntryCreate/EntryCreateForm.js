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

                    <select name="days" className="days" onChange={e =>{
                            setDate({...date, day:e.target.value})
                        }}>
                        <option value="">Day:</option>
                        <option value="01">1</option>
                        <option value="02">2</option>
                        <option value="03">3</option>
                        <option value="04">4</option>
                        <option value="05">5</option>
                        <option value="06">6</option>
                        <option value="07">7</option>
                        <option value="08">8</option>
                        <option value="09">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
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