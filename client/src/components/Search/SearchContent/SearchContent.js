import React, {useState, useCallback} from 'react'
import './SearchContent.scss'

import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {clearSearchAction, searchAction} from '../../../redux/actions/search'
import SearchTags from './SearchType/SearchTags'
import SearchTitle from './SearchType/SearchTitle'

const SearchContent = props => {
    const [searchTitleInput, setSearchTitleInput] = useState('')
    const [searchTagInput, setSearchTagInput] = useState('')

    const {setSearching, search, results, clearSearch} = props

    const history = useHistory()
    const goToEntry = useCallback((storyId, entryId) => history.push(`/story/${storyId}/entry/${entryId}`), [history])

    let resultCards = []
    const resultsExist = results && results.length > 0
    if(resultsExist){
        results.forEach( res => {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            const d = new Date(res.date)
            const date = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`

            resultCards.push(
                <li
                    key={`${res.title}`}
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

    const handleClear =  e => {
        setSearchTagInput('')
        setSearchTitleInput('')
        clearSearch()
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
            <form onSubmit={e=>e.preventDefault()}>
                <SearchTags {...{search, searchTagInput, setSearchTagInput}} />
                <SearchTitle {...{search, searchTitleInput, setSearchTitleInput}}/>
            </form>

            {
                resultsExist?
                <>
                <div className='clear' onClick={handleClear}>Clear Results</div>
                <div className='results'> {resultCards} </div>
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
        search: (searchType, searchTerm) => dispatch(searchAction(searchType, searchTerm)),
        clearSearch: () => dispatch(clearSearchAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContent)