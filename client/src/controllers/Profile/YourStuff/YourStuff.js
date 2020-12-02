import React from 'react'
import './YourStuff.scss'
import YourStories from './YourStories/YourStories'
import YourEntries from './YourEntries/YourEntries'

const YourStuff = props => {
    return (
        <div className='yourStuff'>
            <YourStories/>
            <YourEntries />
        </div>
    )
}

export default YourStuff