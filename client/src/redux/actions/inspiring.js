import axios from 'axios'


export const addInspiringAction = () => {
	return async (dispatch, getState) => {
        const token = getState().profile.token
        const storyId = getState().page.current.story.id

        console.log(storyId, token)

        try {

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
            const res = await axios.post(`http://localhost:3001/api/stories/${storyId}/inspire`, {headers: headers})

            console.log(res)

        }
        catch(error){
            dispatch({
                type: 'ERROR',
                payload: error.response? error.response.data.error : error.message
            })
        }
    }
}