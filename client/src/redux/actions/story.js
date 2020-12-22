import axios from 'axios'
import {history} from '../../index'


export const getAllStoriesAction = () => {
	return async (dispatch, getState) => {
        try {
            console.log('-> getting all stories ...')
            const res = await axios.get('https://memoirbackend.herokuapp.com/api/stories')
            console.log('-> got all stories ...')

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
            const response = await axios.get(`https://memoirbackend.herokuapp.com/api/stories/${storyId}`)
            let sortedEntries = response.data.entries

            if(sortedEntries.length > 0){
                sortedEntries = sortedEntries.sort( (a,b) => {
                    return new Date(a.date) - new Date(b.date);
                })
            }

            dispatch({
                type: 'CURRENT_STORY',
                payload: {...response.data, entries:sortedEntries }
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
            const res = await axios.put(`https://memoirbackend.herokuapp.com/api/stories/edit/${storyId}`, entryInfo, {headers: headers})

            console.log(res)

            dispatch({
                type: 'TOGGLE_MODAL',
                payload: false
            })

            const response = await axios.get(`https://memoirbackend.herokuapp.com/api/stories/${storyId}`)
            let sortedEntries = response.data.entries

            if(sortedEntries.length > 0){
                sortedEntries = sortedEntries.sort( (a,b) => {
                    return new Date(a.date) - new Date(b.date);
                })
            }

            dispatch({
                type: 'CURRENT_STORY',
                payload: {...response.data, entries:sortedEntries }
            })

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
        const userId = getState().profile.user.id

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
            const res = await axios.post(`https://memoirbackend.herokuapp.com/api/stories/create`, formInfo, {headers: headers})

            console.log(res)

            dispatch({
                type: 'TOGGLE_MODAL',
                payload: false
            })

            const response = await axios.get(`https://memoirbackend.herokuapp.com/api/profile/${userId}`, {headers: headers})

            dispatch({
                type: 'ADD_ENTRIES_STORIES',
                payload: {myStories: response.data.stories, myEntries: response.data.userEntries}
            })
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
        const userId = getState().profile.user.id
        const token = getState().profile.token
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
            const res = await axios.delete(`https://memoirbackend.herokuapp.com/api/stories/${storyId}`, {headers: headers})

            console.log(res)

            dispatch({
                type: 'TOGGLE_MODAL',
                payload: false
            })


            if(history.location.pathname === '/profile'){
                const response = await axios.get(`https://memoirbackend.herokuapp.com/api/profile/${userId}`, {headers: headers})

                dispatch({
                    type: 'ADD_ENTRIES_STORIES',
                    payload: {myStories: response.data.stories, myEntries: response.data.userEntries}
                })
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
