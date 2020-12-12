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


            if(history.location.pathname === '/profile'){
                history.go(0)
            } else {
                history.push('/profile')
            }

        }
        catch(error){
            dispatch({
                type: 'ERROR',
                payload: error.response? error.response.data.error : error.message
            })
        }
    }
}

export const deleteEntryAction = (entry) => {
	return async (dispatch, getState) => {

        const token = getState().profile.token

        console.log(entry)
        const storyId = entry.story.id
        const entryId = entry.id


        try {
            const splitEmbed = entry.embed.split(' ')
            const hash = splitEmbed[1]

            if(entry && entry.embed.includes('imgur')){

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



            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }

            await axios.delete(`http://localhost:3001/api/stories/${storyId}/entries/${entryId}`, {headers: headers})

            console.log('entry deleted from database')

            if(history.location.pathname === '/profile'){
                history.go(0)
            } else {
                history.push(`/story/${storyId}`)
            }

        }
        catch(error){
            dispatch({
                type: 'ERROR',
                payload: error.response? error.response.data.error : error.message
            })
        }
    }
}