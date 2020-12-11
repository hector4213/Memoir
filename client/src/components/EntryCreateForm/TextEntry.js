import React from 'react'
import './TextEntry.scss'

import axios from 'axios'

const TextEntry = props => {

    const {setFormInfo, notFilledStyle, formInfo, embed_F, title_F, description_F} = props

    const validateSoundEmbed = embedString => {
        const final = embedString.split('<div')
        return final[0]
    }

    const handupload = async event => {
        // secret : e7679349d19a4645158d98c381a07a859a1e1415

        try {
            console.log('image: ', event.target.files[0])
            const response = await axios({
                method: 'post',
                url: 'https://api.imgur.com/3/image',
                headers: {
                    'Authorization': `Client-ID 39612fe2e37daed`,
                    'Content-Type': 'image'
                    // ...data.getHeaders()
                },
                data : event.target.files[0]
            })

            console.log('picture successfully hosted on imgur')
            // console.log(response.data)

            setFormInfo({ ...formInfo, embed:`${response.data.data.link} ${response.data.data.deletehash}`, embed_F:true })
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <>
            {
                // formInfo.format_id === 2? '' :
                // <input style={embed_F? {} : notFilledStyle} type='text'
                //     placeholder='Enter the embed link'
                //     value = {formInfo.embed? formInfo.embed: ''}
                //     onChange={ e =>{
                //         if(e.target.value){
                //             let validText
                //             if(formInfo.format_id === 3){ validText = validateSoundEmbed(e.target.value) }
                //             setFormInfo({ ...formInfo, embed: validText? validText:e.target.value, embed_F:true })
                //         }
                //         else {
                //             setFormInfo({ ...formInfo, embed: e.target.value, embed_F:false })
                //         }
                //     }}
                // />
            }

            {
                formInfo.format_id === 4?
                <input type="file" onChange={handupload} />: ''
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