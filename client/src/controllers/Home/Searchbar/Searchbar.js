import React, {useState} from 'react'
import './Searchbar.scss'

const Searchbar = props => {

    const [searching, setSearching] = useState(false)
    const [searchInput, setSearchInput] = useState()

    return (
        <div className='search-container'>
            <div className='search-button' onClick={() => setSearching(true)}> Search </div>

            {
                searching?
                <div className='search-screen' onClick={() => {setSearching(false)}}>
                    <div
                        className='search-content'
                        onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}
                    >
                        <form onSubmit={ e => {
                            e.preventDefault()
                            console.log(`searching for ${searchInput}`)
                        }}>
                            <input
                                type='text'
                                placeholder='Search..'
                                onChange={e=>setSearchInput(e.target.value)}
                            />
                        </form>

                        <div className='results'>
                            Results will show up here
                        </div>
                    </div>
                </div>
                :''
            }
        </div>
    )
}

export default Searchbar