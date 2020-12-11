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

            // START OF PATH CHANGE
            dispatch({
                type: 'SET_PATH',
                payload: 'deletedStory'
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

export const deleteEntryAction = (storyId, entryId) => {
	return async (dispatch, getState) => {
        const token = getState().profile.token
        const entry = getState().page.current.entry

        try {


            // EXTRACT DELETE HASH AND USE IT TO DELETE PICTURE FROM IMGUR
            if(entry && entry.embed.includes('imgur')){
                const splitEmbed = entry.embed.split(' ')
                const hash = splitEmbed[1]

                // console.log(hash)

                try {
                    const response = await axios({
                        method: 'DELETE',
                        url: `https://api.imgur.com/3/image/${hash}`,
                        headers: {
                            'Authorization': `Client-ID 39612fe2e37daed`,
                            'Content-Type': 'image'
                        },
                    })

                    console.log('image deleted from imgur')
                    // console.log(response.data)
                }
                catch(error){
                    console.log(error)
                }
            }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
            const res = await axios.delete(`http://localhost:3001/api/stories/${storyId}/entries/${entryId}`, {headers: headers})

            console.log('entry deleted from database')
            // console.log(res)

            // START OF PATH CHANGE
            dispatch({
                type: 'SET_PATH',
                payload: 'deletedEntry'
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