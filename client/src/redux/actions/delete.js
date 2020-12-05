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
        }
        catch(error){
            dispatch({
                type: 'ERROR',
                payload: error.response.data.error
            })
        }
    }
}