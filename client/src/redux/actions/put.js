import axios from 'axios'

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

            // START OF PATH CHANGE
            dispatch({
                type: 'SET_PATH',
                payload: 'refreshStory'
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

export const editEntryAction = entryInfo => {
	return async (dispatch, getState) => {
        const token = getState().profile.token
        const storyId = getState().page.current.story.id
        const entryId = getState().page.current.entry[0].id

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
            const res = await axios.put(`http://localhost:3001/api/stories/${storyId}/entries/edit/${entryId}`, entryInfo, {headers: headers})

            console.log(res)

            // dispatch({
            //     type: 'TOGGLE_MODAL',
            //     payload: false
            // })
        }
        catch(error){
            dispatch({
                type: 'ERROR',
                payload: error.response.data.error
            })
        }
    }
}