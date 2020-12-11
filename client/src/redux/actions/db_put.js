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
                payload: 'editedStory'
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
                payload: error.response? error.response.data.error : error.message
            })
        }
    }
}

export const editEntryAction = entryInfo => {
	return async (dispatch, getState) => {
        const token = getState().profile.token
        const storyId = getState().page.current.story.id
        const entryId = getState().page.current.entry.id

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
            const res = await axios.put(`http://localhost:3001/api/stories/${storyId}/entries/edit/${entryId}`, entryInfo, {headers: headers})

            console.log(res)

            // START OF PATH CHANGE
            dispatch({
                type: 'SET_PATH',
                payload: 'editedEntry'
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
                payload: error.response? error.response.data.error : error.message
            })
        }
    }
}


export const editProfileAction = profileInfo => {
	return async (dispatch, getState) => {
        const token = getState().profile.token

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }

            const res = await axios.put(`http://localhost:3001/api/profile/${profileInfo.id}`, profileInfo, {headers: headers})

            console.log(res)

            dispatch({
                type: 'EDIT_PROFILE',
                payload: profileInfo
            })

            dispatch({
                type: 'TOGGLE_MODAL',
                payload: false,
                showingPage: null
            })

            localStorage.setItem('profile', JSON.stringify({token:token, user:profileInfo}));

        }
        catch(error){
            dispatch({
                type: 'ERROR',
                payload: error.response? error.response.data.error : error.message
            })
        }
    }
}