import React, {useState, useCallback} from 'react'
import './SearchContent.scss'

import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {clearSearchAction, searchTagAction} from '../../redux/actions/search'

const SearchContent = props => {
    const [searchInput, setSearchInput] = useState('')
    const {setSearching, searchTag, results, clearSearch} = props

    const history = useHistory()
    const goToEntry = useCallback((storyId, entryId) => history.push(`/story/${storyId}/entry/${entryId}`), [history])

    let resultCards = []

    if(results){
        results.forEach( res => {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            const d = new Date(res.date)
            const date = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`

            resultCards.push(
                <li
                    key={`${res.id}_${res.date}`}
                    onClick={() => goToEntry(res.story_id, res.id)}
                >
                    <h1>{res.title}</h1>
                    <h2>{res.story.name}</h2>
                    <p>{date}</p>
                </li>
            )
        })
    } else {
        resultCards = null
    }

    const handleSearchSubmit = e => {
        e.preventDefault()
        searchTag(searchInput)
    }

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

                <form onSubmit={handleSearchSubmit}>


                    <div className='search-field search-tags'>
                        <label>entries that have a tag of</label>
                        <input
                            type='text'
                            placeholder='Enter tag here'
                            value={searchInput}
                            onChange={e=>{
                                e.preventDefault()
                                setSearchInput(e.target.value.toLowerCase())
                            }}
                        />
                    </div>


                </form>

                {
                    results?
                    <>
                    <div className='clear' onClick={ e => {
                        setSearchInput('')
                        clearSearch()
                    }}>Clear Results</div>

                    <div className='results'>
                        {resultCards}
                    </div>
                    </>
                    : ''
                }

            </div>
        </div>
    )
}

const mapStateToProps = state =>{
    return {
        results: state.page.results
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        searchTag: searchTerm => dispatch(searchTagAction(searchTerm)),
        clearSearch: () => dispatch(clearSearchAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContent)