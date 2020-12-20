import React from 'react'
import './SearchTitle.scss'

const SearchTitle = props => {
    const {search, searchTitleInput, setSearchTitleInput} = props

    const handleTitleSubmit = e => {
        e.preventDefault()
        search('title', searchTitleInput)
    }

    return (
        <>
        <label> I am trying to find </label>
        <div className='search-field search-title'>
            <label>entries that have a title of</label>
            <input
                type='text'
                placeholder='Enter title here'
                value={searchTitleInput}
                onChange={e=>setSearchTitleInput(e.target.value.toLowerCase())}
                onKeyUp={ e => {
                    if (e.key === 'Enter' || e.keyCode === 13) {
                        handleTitleSubmit(e)
                    }
                }}
            />
        </div>
        </>
    )
}

export default SearchTitle