import React, {useState} from 'react'
import './Search.scss'
import SearchContent from './SearchContent/SearchContent'

const Searchbar = props => {

    const [searching, setSearching] = useState(false)

    return (
        <div className='search-container'>
            <div className='search-button' onClick={() => setSearching(true)}> Search </div>

            {
                searching?
                <SearchContent setSearching={setSearching} />
                :''
            }
        </div>
    )
}

export default Searchbar