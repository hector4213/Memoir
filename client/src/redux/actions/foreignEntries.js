import axios from 'axios'

export const getForeignEntriesAction = () => {
	return async (dispatch, getState) => {
        const userId = getState().profile.user.id
        const token = getState().profile.token

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        }

        try {
            const response = await axios.get(`http://localhost:3001/api/profile/${userId}/manage`, {headers: headers})

            dispatch({
                type: 'FOREIGN_ENTRIES',
                payload: response.data
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

export const editForeignEntriesAction = (entryId, entryStatus) => {
	return async (dispatch, getState) => {
        const userId = getState().profile.user.id
        const token = getState().profile.token

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        }

        try {
            const response = await axios.put(`http://localhost:3001/api/profile/${userId}/manage/${entryId}`, {
                entry_status: entryStatus
            }, {headers: headers})

            console.log(response)

            const res = await axios.get(`http://localhost:3001/api/profile/${userId}/manage`, {headers: headers})

            dispatch({
                type: 'FOREIGN_ENTRIES',
                payload: res.data
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