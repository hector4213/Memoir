import React from 'react'
import './TextEntry.scss'

const TextEntry = props => {

    const {setFormInfo, notFilledStyle, formInfo, embed_F, title_F, description_F} = props

    const validateSoundEmbed = embedString => {
        const final = embedString.split('<div')
        console.log(final[0])
    }

    return (
        <>
            {
                // formInfo.format_id === 2? '' :
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