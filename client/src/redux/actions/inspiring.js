import axios from 'axios'

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

            // get story instead of refreshing

            const response = await axios.get(`https://memoirbackend.herokuapp.com/api/stories/${storyId}`)
            let sortedEntries = response.data.entries

            if(sortedEntries.length > 0){
                sortedEntries = sortedEntries.sort( (a,b) => {
                    return new Date(a.date) - new Date(b.date);
                })
            }

            dispatch({
                type: 'CURRENT_STORY',
                payload: {...response.data, entries:sortedEntries }
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