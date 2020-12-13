import React from 'react'
import './ListEntryTemplate.scss'

const ListEntryTemplate = props => {

    const {children, entry, goToEntry, goToStory} = props

    return (
        <div className='listEntry' onClick={goToEntry}>
            <h1>{entry.title}</h1>
            <div className='listEntryRight'>
                <h2 onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    goToStory()
                }}>{entry.story.name}</h2>

                {children? children: ''}
            </div>
        </div>
    )
}

export default ListEntryTemplate