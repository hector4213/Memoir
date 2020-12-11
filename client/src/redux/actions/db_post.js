import axios from 'axios'

export const createStoryAction = formInfo => {
	return async (dispatch, getState) => {
        const token = getState().profile.token

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
            const res = await axios.post(`http://localhost:3001/api/stories/create`, formInfo, {headers: headers})
            console.log(res)

            // START OF PATH CHANGE
            dispatch({
                type: 'SET_PATH',
                payload: 'createdStory'
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

export const createEntryAction = entryInfo => {
	return async (dispatch, getState) => {
        const token = getState().profile.token
        const storyId = getState().page.current.story.id


        // start of imgur
        // secret : e7679349d19a4645158d98c381a07a859a1e1415
            try {

                const response = await axios({
                    method: 'post',
                    url: 'https://api.imgur.com/3/image',
                    headers: {
                        'Authorization': `Client-ID 39612fe2e37daed`,
                        'Content-Type': 'image'
                    },
                    data : entryInfo.embed
                })

                console.log('picture successfully hosted on imgur')
                // console.log(response.data)

                entryInfo = { ...entryInfo, embed:`${response.data.data.link} ${response.data.data.deletehash}`}
            }
            catch(error){
                console.log(error)
            }
        // end of imgur

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
            // const res = await axios.post(`http://localhost:3001/api/stories/${storyId}/entries`, entryInfo, {headers: headers})
            await axios.post(`http://localhost:3001/api/stories/${storyId}/entries`, entryInfo, {headers: headers})

            console.log('entry successfully saved on db')
            // console.log(res)

            // START OF PATH CHANGE
            dispatch({
                type: 'SET_PATH',
                payload: 'createdEntry'
            })
            // needs to be set back to null
            dispatch({
                type: 'SET_PATH',
                payload: null
            })
            // END OF PATH CHANGE

        }
        catch(error){
            console.log({error})
            if(error.response.data.error){
                dispatch({
                    type: 'ERROR',
                    payload: error.response.data.error
                })

            } else {
                dispatch({
                    type: 'ERROR',
                    payload: error.response.data
                })
            }
        }
    }
}