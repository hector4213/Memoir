// import axios from 'axios'


export const addInspiringAction = () => {
	return async (dispatch, getState) => {
        const token = getState().profile.token
        const storyId = getState().page.current.story.id

        console.log(`mark story ${storyId} as inspiring`)

        // try {
        //     const headers = {
        //         'Content-Type': 'application/json',
        //         'Authorization': `bearer ${token}`
        //     }
        //     const res = await axios.put(`http://localhost:3001/api/stories/edit/${storyId}`, entryInfo, {headers: headers})

        //     console.log(res)

        //     dispatch({
        //         type: 'TOGGLE_MODAL',
        //         payload: false
        //     })

        //     history.go(0)

        // }
        // catch(error){
        //     dispatch({
        //         type: 'ERROR',
        //         payload: error.response? error.response.data.error : error.message
        //     })
        // }
    }
}