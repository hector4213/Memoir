import React from 'react'
import './TextEntry.scss'

import axios from 'axios'

const TextEntry = props => {

    const {setFormInfo, notFilledStyle, formInfo, embed_F, title_F, description_F} = props


    const handleVideoEmbed = e => {
        if(e.target.value){
            setFormInfo({
                ...formInfo,
                embed: e.target.value,
                embed_F:true
            })
        }
        else {
            setFormInfo({
                ...formInfo,
                embed: e.target.value,
                embed_F:false
            })
        }
    }


    const handleAudioEmbed = e => {
        if(e.target.value){
            const embedString = e.target.value
            const final = embedString.split('<div')

            setFormInfo({
                ...formInfo,
                embed: final[0],
                embed_F:true
            })
        }
        else {
            setFormInfo({
                ...formInfo,
                embed: e.target.value,
                embed_F:false
            })
        }
    }


    const handleImageEmbed = async e => {
        if(formInfo.embed.includes('imgur')){
            const fullEmbed = formInfo.embed.split(' ')
            const hash = fullEmbed[1]

            await axios({
                method: 'DELETE',
                url: `https://api.imgur.com/3/image/${hash}`,
                headers: {
                    'Authorization': `Client-ID 39612fe2e37daed`,
                    'Content-Type': 'image'
                },
            })
        }

        const response = await axios({
            method: 'post',
            url: 'https://api.imgur.com/3/image',
            headers: {
                'Authorization': `Client-ID 39612fe2e37daed`,
                'Content-Type': 'image'
            },
            data : e.target.files[0]
        })

        setFormInfo({
            ...formInfo,
            embed:`${response.data.data.link} ${response.data.data.deletehash}`,
            embed_F:true
        })
    }


    return (
        <>
            {
                // IF VIDEO FORMAT ID
                formInfo.format_id === 1 ?
                <input
                    type='text'
                    name='video-embed'
                    style={embed_F? {} : notFilledStyle}
                    placeholder= 'Paste YouTube embed text here'
                    value = {formInfo.embed? formInfo.embed: ''}
                    onChange={handleVideoEmbed}
                /> : ''
            }

            {
                // IF AUDIO FORMAT ID
                formInfo.format_id === 3 ?
                <input
                    type='text'
                    name='audio-embed'
                    style={embed_F? {} : notFilledStyle}
                    placeholder= 'Paste SoundCloud embed text here'
                    value = {formInfo.embed? formInfo.embed: ''}
                    onChange={handleAudioEmbed}
                /> : ''
            }

            {
                // IF IMAGE FORMAT ID
                formInfo.format_id === 4 ?
                <input
                    type="file"
                    name='image-embed'
                    style={embed_F? {} : notFilledStyle}
                    onChange={handleImageEmbed}
                /> : ''
            }

            <input
                style={title_F? {} : notFilledStyle}
                name='title'
                type='text'
                placeholder='Enter the title'
                value = {formInfo.title? formInfo.title : ''}
                onChange={ e => {
                    if(e.target.value){
                        setFormInfo( {...formInfo, title: e.target.value, title_F:true })
                    } else {
                        setFormInfo( {...formInfo, title: e.target.value, title_F:false })
                    }
                }}
            />

            <textarea
                rows="6"
                style={description_F? {} : notFilledStyle}
                name='description'
                type='text'
                placeholder='Enter the description'
                value = {formInfo.description? formInfo.description : ''}
                onChange={ e => {
                    if(e.target.value){
                        setFormInfo( {...formInfo, description: e.target.value, description_F:true })
                    } else {
                        setFormInfo( {...formInfo, description: e.target.value, description_F:false })
                    }
                }}
            />
        </>

    )
}

export default TextEntry