import React, {useState} from 'react'
import './StoryCreate.scss'
import Button from '../../templates/Button/Button'
import {connect} from 'react-redux'
import {createStoryAction} from '../../redux/actions/story'
import {setErrorAction} from '../../redux/actions/page'
import { deleteFromImgur, postToImgur } from '../../components/api/imgur'

const StoryCreate = props => {
    const [formInfo, setFormInfo] = useState({
        image_f: true,
        name_f: true,
        occupation_f: true
    })
    const [storyImg, setStoryImg] = useState()
    const {createStory, setError} = props

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

    const notFilledStyle = {border: '2px solid red'}

    return (
        <form>
            <div className='story-img'>
                <div className='story-img-picture' style={storyImg?{background:`url(${storyImg})`}:{}}/>
            </div>

            <h2>Create a new Story</h2>

            <input
                autoComplete="off"
                type="file"
                name='image-embed'
                style={formInfo.image_f? {} : notFilledStyle}
                onChange={handleImageEmbed}
            />

            <input
                autoComplete="off"
                type='text'
                name='name'
                placeholder='Enter story name'
                style={formInfo.name_f? {} : notFilledStyle}
                onChange={ e => {
                    e.preventDefault()
                    const val = e.target.value
                    if(val !== ''){
                        setFormInfo( {...formInfo, name: val, name_f:true })
                    } else {
                        setFormInfo( {...formInfo, name: val, name_f:false })
                    }
                }}
            />

            <input
                autoComplete="off"
                type='text'
                name='occupation'
                placeholder='Enter the persons occupation'
                style={formInfo.occupation_f? {} : notFilledStyle}
                onChange={ e =>{
                    e.preventDefault()
                    const val = e.target.value
                    if(val !== ''){
                        setFormInfo( {...formInfo, occupation: val, occupation_f:true })
                    } else {
                        setFormInfo( {...formInfo, occupation: val, occupation_f:false })
                    }
                }}
            />

            <Button {...{
                label:'Submit',
                transparent: false,
                extraClass:'submit-createStory',
                onClick: e => {
                    e.preventDefault()
                    console.log(formInfo)
                    if(
                        formInfo.story_img &&
                        formInfo.name &&
                        formInfo.name.length>=3 &&
                        formInfo.occupation&&
                        formInfo.occupation.length>=3
                    ){
                        createStory(formInfo)
                    } else {
                        setError(`Failed to Add Story:  ${formInfo.story_img? '': 'No Image Uploaded. '} ${formInfo.name? '': 'A Name was not given. '} ${formInfo.occupation? '':'No occupation was provided.'}`)

                        setFormInfo({
                            ...formInfo,
                            image_f: formInfo.story_img? true: false,
                            name_f: formInfo.name && formInfo.name.length>=3? true: false,
                            occupation_f: formInfo.occupation && formInfo.occupation.length>=3? true: false
                        })
                    }
                }
            }}/>
        </form>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        createStory: (formInfo) => dispatch(createStoryAction(formInfo)),
        setError: errorMessage => dispatch(setErrorAction(errorMessage))
    }
}

export default connect(null, mapDispatchToProps)(StoryCreate)