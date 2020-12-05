import axios from 'axios'

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
            console.log(error)
        }
    }
}

export const getSingleStoryAction = storyId => {
	return async (dispatch, getState) => {
        try {
            const res = await axios.get(`http://localhost:3001/api/stories/${storyId}`)
            dispatch({
                type: 'CURRENT_STORY',
                payload: res.data
            })
        }
        catch(error){
            console.log(error)
        }
    }
}

export const getSingleEntryAction = (storyId, entryId) => {
	return async (dispatch, getState) => {
        try {
            const res = await axios.get(`http://localhost:3001/api/stories/${storyId}/entries/${entryId}`)

            dispatch({
                type: 'CURRENT_ENTRY',
                payload: res.data
            })
        }
        catch(error){
            console.log(error)
        }
    }
}