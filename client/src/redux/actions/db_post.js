import axios from 'axios'

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

            // START OF PATH CHANGE
            dispatch({
                type: 'SET_PATH',
                payload: 'createdStory'
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
            console.log(error)
        }
    }
}

export const createEntryAction = entryInfo => {
	return async (dispatch, getState) => {
        const token = getState().profile.token
        const storyId = getState().page.current.story.id

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
            const res = await axios.post(`http://localhost:3001/api/stories/${storyId}/entries`, entryInfo, {headers: headers})
            console.log(res)

            console.log('creating entry')

            // START OF PATH CHANGE
            dispatch({
                type: 'SET_PATH',
                payload: 'createdEntry'
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