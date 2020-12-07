import React, { useState } from 'react'
import './StoryEdit.scss'

import {connect} from 'react-redux'
import {editStoryAction} from '../../redux/actions/put'
import {deleteStoryAction} from '../../redux/actions/delete'

import Button from '../../components/Button/Button'

const StoryEdit = props => {
    const {story} = props
    const {editStory, deleteStory} = props
    const [formInfo, setFormInfo] = useState({
        name: story.name,
        occupation: story.occupation,
        story_img: story.story_img
    })

    return (
        <form className='story-edit'>
            <div className='story-img'>
                <div className='story-img-picture' style={{background:`url(${formInfo.story_img})`}}/>
            </div>

            <h2>Edit {formInfo.name}'s Story</h2>

            <input type='text' value={formInfo.story_img}
                onChange={ e => {
                    setFormInfo( {...formInfo, story_img: e.target.value })
                }}
            />

            <input type='text' value={formInfo.name}
                onChange={ e => setFormInfo( {...formInfo, name: e.target.value })}
            />

            <input type='text' value={formInfo.occupation}
                onChange={ e => setFormInfo( {...formInfo, occupation: e.target.value })}
            />

            <div className='story-story-btns'>
                <Button {...{
                    label:'Delete Story',
                    transparent: true,
                    extraClass: 'delete-story',
                    onClick: e => {
                        e.preventDefault()
                        // eslint-disable-next-line no-restricted-globals
                        if (confirm(`Are you sure you want to delete ${story.name}'s story?`)) {
                            deleteStory(story.id)
                        } else {
                            console.log('delete was cancelled')
                        }
                    }
                }}/>

                <Button {...{
                    label:'Submit',
                    transparent: false,
                    onClick: e => {
                        e.preventDefault()
                        editStory(formInfo)
                    }
                }}/>
            </div>

        </form>
    )
}

const mapStateToProps = state => {
    return {
        story: state.page.current.story
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editStory: entryInfo => dispatch(editStoryAction(entryInfo)),
        deleteStory: storyId => dispatch(deleteStoryAction(storyId)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryEdit)