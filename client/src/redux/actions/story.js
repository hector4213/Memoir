import axios from 'axios'
import {history} from '../../index'


export const getAllStoriesAction = () => {
	return async (dispatch, getState) => {
        try {
            const res = await axios.get('http://localhost:3001/api/stories')
            dispatch({
                type: 'SET_ALL_STORIES',
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


export const getSingleStoryAction = storyId => {
	return async (dispatch, getState) => {
        try {
            const res = await axios.get(`http://localhost:3001/api/stories/${storyId}`)
            let sortedEntries = res.data.entries

            if(sortedEntries.length > 0){
                sortedEntries = sortedEntries.sort( (a,b) => {
                    return new Date(a.date) - new Date(b.date);
                })
            }

            dispatch({
                type: 'CURRENT_STORY',
                payload: {...res.data, entries:sortedEntries }
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


export const editStoryAction = entryInfo => {
	return async (dispatch, getState) => {
        const token = getState().profile.token
        const storyId = getState().page.current.story.id

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
            const res = await axios.put(`http://localhost:3001/api/stories/edit/${storyId}`, entryInfo, {headers: headers})

            console.log(res)

            dispatch({
                type: 'TOGGLE_MODAL',
                payload: false
            })

            history.go(0)

        }
        catch(error){
            dispatch({
                type: 'ERROR',
                payload: error.response? error.response.data.error : error.message
            })
        }
    }
}


export const createStoryAction = formInfo => {
	return async (dispatch, getState) => {
        const token = getState().profile.token

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
            const res = await axios.post(`http://localhost:3001/api/stories/create`, formInfo, {headers: headers})

            console.log(res)

            dispatch({
                type: 'TOGGLE_MODAL',
                payload: false
            })

            history.go(0)
        }
        catch(error){
            dispatch({
                type: 'ERROR',
                payload: error.response? error.response.data.error : error.message
            })
        }
    }
}


export const deleteStoryAction = storyId => {
	return async (dispatch, getState) => {
        const token = getState().profile.token
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
            const res = await axios.delete(`http://localhost:3001/api/stories/${storyId}`, {headers: headers})

            console.log(res)

            dispatch({
                type: 'TOGGLE_MODAL',
                payload: false
            })


            if(history.location.pathname === '/profile'){
                history.go(0)
            } else {
                history.push('/profile')
            }

        }
        catch(error){
            dispatch({
                type: 'ERROR',
                payload: error.response? error.response.data.error : error.message
            })
        }
    }
}
