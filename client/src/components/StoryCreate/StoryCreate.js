import React, {useState} from 'react'
import './StoryCreate.scss'
import Button from '../Button/Button'
import {connect} from 'react-redux'
import {createStoryAction} from '../../redux/actions/post'

const StoryCreate = props => {
    const [formInfo, setFormInfo] = useState()
    const [storyImg, setStoryImg] = useState()
    const {createStory, token} = props

    return (
        <form>
            <div className='story-img'>
                <div className='story-img-picture' style={storyImg?{background:`url(${storyImg})`}:{}}/>
            </div>

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
                    createStory(formInfo, token)
                }
            }}/>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        token: state.profile.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createStory: (formInfo, token) => dispatch(createStoryAction(formInfo, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryCreate)