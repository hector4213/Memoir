import axios from 'axios'
import {history} from '../../index'

export const addInspiringAction = () => {
	return async (dispatch, getState) => {
        const token = getState().profile.token
        const storyId = getState().page.current.story.id

        try {

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
            const res = await axios.post(`https://memoirbackend.herokuapp.com/api/stories/${storyId}/inspire`, null, {headers: headers})

            console.log(res)
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