import axios from 'axios'

export const createStoryAction = (formInfo, token) => {
	return async (dispatch, getState) => {
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
        }
        catch(error){
            console.log(error)
        }
    }
}