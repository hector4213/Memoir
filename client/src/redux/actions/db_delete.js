import axios from 'axios'

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

            // START OF PATH CHANGE
            dispatch({
                type: 'SET_PATH',
                payload: 'deletedStory'
            })
            // needs to be set back to null
            dispatch({
                type: 'SET_PATH',
                payload: null
            })
            // END OF PATH CHANGE

            dispatch({
                type: 'TOGGLE_MODAL',
                payload: false
            })
        }
        catch(error){
            dispatch({
                type: 'ERROR',
                payload: error.response.data.error
            })
        }
    }
}

export const deleteEntryAction = (storyId, entryId) => {
	return async (dispatch, getState) => {
        const token = getState().profile.token

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
            const res = await axios.delete(`http://localhost:3001/api/stories/${storyId}/entries/${entryId}`, {headers: headers})
            console.log(res)

            // START OF PATH CHANGE
            dispatch({
                type: 'SET_PATH',
                payload: 'deletedEntry'
            })
            // needs to be set back to null
            dispatch({
                type: 'SET_PATH',
                payload: null
            })
            // END OF PATH CHANGE
        }
        catch(error){
            dispatch({
                type: 'ERROR',
                payload: error.response.data.error
            })
        }
    }
}