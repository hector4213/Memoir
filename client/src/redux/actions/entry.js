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

            const res = await axios.put(`https://memoirbackend.herokuapp.com/api/stories/${storyId}/entries/edit/${entryId}`, entryInfo, {headers: headers})

            console.log(res)

            console.log(entryInfo)

            const response = await axios.get(`https://memoirbackend.herokuapp.com/api/stories/${storyId}/entries/${entryId}`)

            dispatch({
                type: 'CURRENT_ENTRY',
                payload: response.data
            })

            history.push(`/story/${storyId}/entry/${entryId}`)

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

        const storyAuthorId = getState().page.current.story.user.id
        const storyAuthorName = getState().page.current.story.user.username
        const userId = getState().profile.user.id

        try {

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }

            const res = await axios.post(`https://memoirbackend.herokuapp.com/api/stories/${storyId}/entries`, entryInfo, {headers: headers})

            console.log('entry successfully saved on db')

            if(storyAuthorId !== userId){
                dispatch({
                    type: 'ERROR',
                    payload: `* New entry will be visible when ${storyAuthorName} approves it.`
                })
            }

            console.log(res)
            // this is where the ENTRY ID is needed to redirect to entry

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
            const res = await axios.get(`https://memoirbackend.herokuapp.com/api/stories/${storyId}/entries/${entryId}`)

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
        const userId = getState().profile.user.id

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

            await axios.delete(`https://memoirbackend.herokuapp.com/api/stories/${storyId}/entries/${entryId}`, {headers: headers})

            console.log('entry deleted from database')

            const response = await axios.get(`https://memoirbackend.herokuapp.com/api/profile/${userId}`, {headers: headers})

            dispatch({
                type: 'ADD_ENTRIES_STORIES',
                payload: {myStories: response.data.stories, myEntries: response.data.userEntries}
            })

            if(history.location.pathname !== '/profile'){
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