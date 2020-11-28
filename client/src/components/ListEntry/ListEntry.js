import React from 'react'
import './ListEntry.scss'

import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const ListEntry = props => {

    const {entryName, storyName, visible} = props;

    return (
    <div className='listEntry'>
        <h1>{entryName}</h1>
        <div className='listEntryRight'>
            <h2>{storyName}</h2>
            {visible? <HiOutlineEye/> : <HiOutlineEyeOff/>}
        </div>
    </div>
    )
}

export default ListEntry