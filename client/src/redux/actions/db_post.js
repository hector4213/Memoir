import axios from 'axios'
import {history} from '../../index'

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

            dispatch({
                type: 'TOGGLE_MODAL',
                payload: false
            })

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

export const createEntryAction = entryInfo => {
	return async (dispatch, getState) => {
        const token = getState().profile.token
        const storyId = getState().page.current.story.id

        try {
            if(entryInfo.format_id === 4){
                // POST TO IMGUR
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

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
            // const res = await axios.post(`http://localhost:3001/api/stories/${storyId}/entries`, entryInfo, {headers: headers})
            await axios.post(`http://localhost:3001/api/stories/${storyId}/entries`, entryInfo, {headers: headers})

            console.log('entry successfully saved on db')

            history.push(`/story/${storyId}`)

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