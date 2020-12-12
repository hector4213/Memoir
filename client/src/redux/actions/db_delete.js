import axios from 'axios'
import {history} from '../../index'

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

            dispatch({
                type: 'TOGGLE_MODAL',
                payload: false
            })

            history.push('/profile')

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

            if(entry && entry.embed.includes('imgur')){
                const splitEmbed = entry.embed.split(' ')
                const hash = splitEmbed[1]

                try {

                    await axios({
                        method: 'DELETE',
                        url: `https://api.imgur.com/3/image/${hash}`,
                        headers: {
                            'Authorization': `Client-ID 39612fe2e37daed`,
                            'Content-Type': 'image'
                        },
                    })

                    console.log('image deleted from imgur')
                }
                catch(error){
                    console.log(error)
                }
            }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }

            await axios.delete(`http://localhost:3001/api/stories/${storyId}/entries/${entryId}`, {headers: headers})

            console.log('entry deleted from database')

            history.push(`/story/${storyId}`)

        }
        catch(error){
            dispatch({
                type: 'ERROR',
                payload: error.response? error.response.data.error : error.message
            })
        }
    }
}