import React,{useState} from 'react'
import './EntryCreate.scss'

import {connect} from 'react-redux'
import {createEntryAction} from '../../redux/actions/post'
import { HiPlay, HiPencilAlt, HiVolumeUp, HiPhotograph } from "react-icons/hi";
import Button from '../../components/Button/Button'
import HomeButton from '../../components/HomeButton/HomeButton'
import StoryCard from '../../components/StoryCard/StoryCard'

const EntryCreate = props => {
    const [formInfo, setFormInfo] = useState({format_id:0})
    const {createEntry, story} = props

    console.log(story)

    return (
        <div className='entry-create'>
            <HomeButton/>

            <StoryCard {...{
                story: story,
                specialStyle:{margin:'50px auto'},
                // deleteCard: ,
                // inTimeline:false
            }}/>

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
                <input type='text' placeholder='Enter embed'
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
                            console.log(e.target.value)
                            // setFormInfo( {...formInfo, date: e.target.value })
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
                    <input type='text' placeholder='Day'
                    onChange={ e =>{
                        setFormInfo( {...formInfo, description: e.target.value })
                    }}
                    />
                    <input type='text' placeholder='Year'
                        onChange={ e =>{
                            setFormInfo( {...formInfo, description: e.target.value })
                        }}
                    />
                </div>


                <Button {...{
                    label:'Submit',
                    transparent: false,
                    onClick: e => {
                        e.preventDefault()
                        createEntry(formInfo)
                    }
                }}/>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        story: state.page.current.story
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createEntry: formInfo => dispatch(createEntryAction(formInfo)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryCreate)