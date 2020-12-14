// import axios from 'axios'


export const addInspiringAction = () => {
	return async (dispatch, getState) => {


        console.log('mark as inspiring')

        // const token = getState().profile.token
        // const storyId = getState().page.current.story.id

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