import React from 'react'
import './ListEntryTemplate.scss'

const ListEntryTemplate = props => {

    const {children, entry, goToEntry, goToStory} = props

    const title = () => {
        const limit = 55
        if(entry.title.length > limit){
            return entry.title.substr(0, limit)
        } else {
            return entry.title
        }
    }

    const name = () => {
        const limit = 20
        if(entry.story.name.length > limit){
            return entry.story.name.substr(0, limit)
        } else {
            return entry.story.name
        }
    }

    return (
        <div className='listEntry' onClick={goToEntry}>
            <h1>{title()}</h1>
            <div className='listEntryRight'>
                <h2 onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    goToStory()
                }}>{name()}</h2>

                {children? children: ''}
            </div>
        </div>
    )
}

export default ListEntryTemplate