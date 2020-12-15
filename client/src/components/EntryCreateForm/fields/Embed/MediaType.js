import React from 'react'
import './MediaType.scss'

import { HiPlay, HiPencilAlt, HiVolumeUp, HiPhotograph } from "react-icons/hi";

const MediaType = props => {

    const {format_id_F, setFormInfo, formInfo, notFilledStyle} = props

    return (
        <div style={format_id_F?{}: notFilledStyle} className='media-tabs'>
            <button
                name='video'
                className={`embedIcons ${formInfo.format_id===1? 'active' : ''}`}
                onClick={ e => {
                    e.preventDefault()
                    setFormInfo( {...formInfo, format_id:1, format_id_F:true})
                }}
            >
            <HiPlay/>
            <h2>Video</h2>
            </button>

            <button
                name='text'
                className={`embedIcons ${formInfo.format_id===2? 'active' : ''}`}
                onClick={ e => {
                    e.preventDefault()
                    setFormInfo( {...formInfo, format_id:2, format_id_F:true})
                }}
            >
            <HiPencilAlt/>
            <h2>Text</h2>
            </button>

            <button
                name='audio'
                className={`embedIcons ${formInfo.format_id===3? 'active' : ''}`}
                onClick={ e => {
                    e.preventDefault()
                    setFormInfo( {...formInfo, format_id:3, format_id_F:true})
                }}
            >
            <HiVolumeUp/>
            <h2>Audio</h2>
            </button>

            <button
                name='image'
                className={`embedIcons ${formInfo.format_id===4? 'active' : ''}`}
                onClick={ e =>{
                    e.preventDefault()
                    setFormInfo( {...formInfo, format_id:4, format_id_F:true})
                }}
            >
            <HiPhotograph/>
            <h2>Image</h2>
            </button>
        </div>
    )
}

export default MediaType