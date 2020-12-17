import React, {useState} from 'react'
import './StoryCreate.scss'
import Button from '../../templates/Button/Button'
import {connect} from 'react-redux'
import {createStoryAction} from '../../redux/actions/story'

import { deleteFromImgur, postToImgur } from '../../components/api/imgur'

const StoryCreate = props => {
    const [formInfo, setFormInfo] = useState()
    const [storyImg, setStoryImg] = useState()
    const {createStory} = props

    const handleImageEmbed = async e => {
        if(storyImg && storyImg.includes('imgur')){
            await deleteFromImgur(formInfo.embed)
        }

        const response = await postToImgur(e.target.files[0])
        setStoryImg(response.data.data.link)
        setFormInfo({
            ...formInfo,
            story_img: `${response.data.data.link} ${response.data.data.deletehash}`
        })
    }

    return (
        <form>
            <div className='story-img'>
                <div className='story-img-picture' style={storyImg?{background:`url(${storyImg})`}:{}}/>
            </div>

            <h2>Create a new Story</h2>

            <input
                type="file"
                name='image-embed'
                onChange={handleImageEmbed}
            />

            <input
                type='text'
                name='name'
                placeholder='Enter story name'
                onChange={ e => setFormInfo( {...formInfo, name: e.target.value })}
            />

            <input
                type='text'
                name='occupation'
                placeholder='Enter the persons occupation'
                onChange={ e => setFormInfo( {...formInfo, occupation: e.target.value })}
            />

            <Button {...{
                label:'Submit',
                transparent: false,
                extraClass:'submit-createStory',
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