import React from 'react'
import './SearchTags.scss'

const SearchTags = props => {
    const {search, searchTagInput, setSearchTagInput} = props

    const handleTagSubmit = e => {
        e.preventDefault()
        search('tag' , searchTagInput)
    }

    return (
        <>
        <label> I am trying to find </label>
        <div className='search-field search-tags'>
            <label>entries that have a tag of</label>
            <input
                type='text'
                placeholder='Enter tag here'
                value={searchTagInput}
                onChange={e=>setSearchTagInput(e.target.value.toLowerCase())}
                onKeyDown={ e => {
                    if (e.key === 'Enter' || e.keyCode === 13) {
                        handleTagSubmit(e)
                    }
                }}
            />
        </div>
        </>
    )
}

export default SearchTags