import axios from 'axios'

export const getAllStoriesAction = formInfo => {
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