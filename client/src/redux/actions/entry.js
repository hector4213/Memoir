import axios from 'axios'
import {history} from '../../index'

export const editEntryAction = entryInfo => {
	return async (dispatch, getState) => {
        const token = getState().profile.token
        const storyId = getState().page.current.story.id
        const entryId = getState().page.current.entry.id

        try {

            entryInfo = {
                date: entryInfo.date,
                description: entryInfo.description,
                embed: entryInfo.embed,
                format_id: entryInfo.format_id,
                hashtags: entryInfo.hashtags,
                title: entryInfo.title,
            }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }

            const res = await axios.put(`http://localhost:3001/api/stories/${storyId}/entries/edit/${entryId}`, entryInfo, {headers: headers})

            console.log(res)

            history.push(`/story/${storyId}/entry/${entryId}`)
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


export const getSingleEntryAction = (storyId, entryId) => {
	return async (dispatch, getState) => {
        try {
            const res = await axios.get(`http://localhost:3001/api/stories/${storyId}/entries/${entryId}`)

            dispatch({
                type: 'CURRENT_ENTRY',
                payload: res.data
            })
        }
        catch(error){
            console.log({error})

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

        const storyId = entry.story.id
        const entryId = entry.id


        try {
            const splitEmbed = entry.embed? entry.embed.split(' ') : ''
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
            console.log({error})
            dispatch({
                type: 'ERROR',
                payload: error.response? error.response.data.error : error.message
            })
        }
    }
}