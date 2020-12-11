import React from 'react'
import './TextEntry.scss'

import axios from 'axios'

const TextEntry = props => {

    const {setFormInfo, notFilledStyle, formInfo, embed_F, title_F, description_F} = props

    const validateSoundEmbed = embedString => {
        const final = embedString.split('<div')
        return final[0]
    }

    const handFileChange = async e => {
        if(formInfo.embed.includes('imgur')){
            const fullEmbed = formInfo.embed.split(' ')
            const hash = fullEmbed[1]

            console.log('editing entry')

            await axios({
                method: 'DELETE',
                url: `https://api.imgur.com/3/image/${hash}`,
                headers: {
                    'Authorization': `Client-ID 39612fe2e37daed`,
                    'Content-Type': 'image'
                },
            })

            console.log('image deleted from imgur')
            console.log(e.target.files[0])
            const response = await axios({
                method: 'post',
                url: 'https://api.imgur.com/3/image',
                headers: {
                    'Authorization': `Client-ID 39612fe2e37daed`,
                    'Content-Type': 'image'
                },
                data : e.target.files[0]
            })

            console.log('new picture uploaded to imgur')
            setFormInfo({ ...formInfo, embed:`${response.data.data.link} ${response.data.data.deletehash}`})
            console.log(formInfo)
        }

        // setFormInfo({ ...formInfo, embed: e.target.files[0], embed_F:true })
    }

    return (
        <>
            {
                // IF VIDEO OR AUDIO FORMAT ID SHOW EMBED FIELD
                formInfo.format_id === 1 || formInfo.format_id === 3?
                <input style={embed_F? {} : notFilledStyle} type='text'
                    placeholder='Enter the embed link'
                    value = {formInfo.embed? formInfo.embed: ''}
                    onChange={ e =>{
                        if(e.target.value){
                            let validText
                            if(formInfo.format_id === 3){ validText = validateSoundEmbed(e.target.value) }
                            setFormInfo({ ...formInfo, embed: validText? validText:e.target.value, embed_F:true })
                        }
                        else {
                            setFormInfo({ ...formInfo, embed: e.target.value, embed_F:false })
                        }
                    }}
                />
                : ''
            }

            {
                // IMAGE FORMAT ID
                formInfo.format_id === 4?
                <input type="file" onChange={handFileChange} />: ''
            }

            <input style={title_F? {} : notFilledStyle} type='text' placeholder='Enter the title'
                value = {formInfo.title? formInfo.title: ''}
                onChange={ e =>{
                    if(e.target.value){
                        setFormInfo( {...formInfo, title: e.target.value, title_F:true })
                    } else {
                        setFormInfo( {...formInfo, title: e.target.value, title_F:false })
                    }
                }}
            />

            <textarea rows="6" style={description_F? {} : notFilledStyle} type='text' placeholder='Enter the description'
                value = {formInfo.description? formInfo.description: ''}
                onChange={ e =>{
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