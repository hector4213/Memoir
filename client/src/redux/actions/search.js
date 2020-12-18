// GET http://localhost:3001/api/search/entries?tag=lol
import axios from 'axios'
// import {history} from '../../index'


export const clearSearchAction = searchTerm => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SEARCH_RESULTS',
            payload: null
        })
    }
}


export const searchTagAction = searchTerm => {
	return async (dispatch, getState) => {
        try {
            console.log('searching...')
            const res = await axios.get(`http://localhost:3001/api/search/entries?tag=${searchTerm}`)
            console.log('found!')
            console.log(res)

            dispatch({
                type: 'SEARCH_RESULTS',
                payload: res.data
            })
        }
        catch(error){
            console.log({error})

            dispatch({
                type: 'ERROR',
                payload: error.response? error.response.data.error : error.message
            })
        }
    }
}