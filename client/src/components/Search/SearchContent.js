import React, {useState} from 'react'
import './SearchContent.scss'

const SearchContent = props => {
    const [searchInput, setSearchInput] = useState()
    const {setSearching} = props

    return (
        <div className='search-screen' onClick={() => {setSearching(false)}}>
            <div
                className='search-content'
                onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                }}
            >
                <label> I am trying to find </label>



                <form onSubmit={ e => {
                    e.preventDefault()
                    console.log(`searching for ${searchInput}`)
                }}>
                    <div className='search-field search-tags'>
                        <label>entries that have a tag of</label>
                        <input
                            type='text'
                            placeholder='Enter tag here'
                            onChange={e=>setSearchInput(e.target.value)}
                        />
                    </div>
                </form>

                <div className='results'>
                    Results will show up here
                </div>
            </div>
        </div>
    )
}

export default SearchContent