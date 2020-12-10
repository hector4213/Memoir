import axios from 'axios'

export const getAllStoriesAction = () => {
	return async (dispatch, getState) => {
        try {
            const res = await axios.get('http://localhost:3001/api/stories')
            dispatch({
                type: 'SET_ALL_STORIES',
                payload: res.data
            })
        }
        catch(error){
            console.log({error})

            dispatch({
                type: 'ERROR',
                payload: error.message
            })
        }
    }
}

export const getSingleStoryAction = storyId => {
	return async (dispatch, getState) => {
        try {
            const res = await axios.get(`http://localhost:3001/api/stories/${storyId}`)
            let sortedEntries = res.data.entries

            if(sortedEntries.length > 0){
                sortedEntries = sortedEntries.sort( (a,b) => {
                    return new Date(a.date) - new Date(b.date);
                })
            }

            dispatch({
                type: 'CURRENT_STORY',
                payload: {...res.data, entries:sortedEntries }
            })
        }
        catch(error){
            console.log({error})

            dispatch({
                type: 'ERROR',
                payload: error.message
            })
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
                payload: error.message
            })
        }
    }
}