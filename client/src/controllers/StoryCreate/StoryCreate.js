import React, {useState} from 'react'
import './StoryCreate.scss'
import Button from '../../templates/Button/Button'
import {connect} from 'react-redux'
import {createStoryAction} from '../../redux/actions/story'

const StoryCreate = props => {
    const [formInfo, setFormInfo] = useState()
    const [storyImg, setStoryImg] = useState()
    const {createStory} = props

    return (
        <form>
            <div className='story-img'>
                <div className='story-img-picture' style={storyImg?{background:`url(${storyImg})`}:{}}/>
            </div>

            <h2>Create a new Story</h2>

            <input type='text' placeholder='Enter the story image link'
                onChange={ e => {
                    setStoryImg(e.target.value)
                    setFormInfo( {...formInfo, story_img: e.target.value })
                }}
            />

            <input type='text' placeholder='Enter story name'
                onChange={ e => setFormInfo( {...formInfo, name: e.target.value })}
            />

            <input type='text' placeholder='Enter the persons occupation'
                onChange={ e => setFormInfo( {...formInfo, occupation: e.target.value })}
            />

            <Button {...{
                label:'Submit',
                transparent: false,
                onClick: e => {
                    e.preventDefault()
                    createStory(formInfo)
                }
            }}/>
        </form>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        createStory: (formInfo) => dispatch(createStoryAction(formInfo))
    }
}

export default connect(null, mapDispatchToProps)(StoryCreate)