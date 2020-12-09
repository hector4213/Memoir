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
            console.log(error)
        }
    }
}

export const editForeignEntriesAction = entryId => {
	return async (dispatch, getState) => {
        const userId = getState().profile.user.id
        const token = getState().profile.token

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        }

        try {
            const response = await axios.put(`http://localhost:3001/api/profile/${userId}/manage/${entryId}`, {headers: headers})

            dispatch({
                type: 'FOREIGN_ENTRIES',
                payload: response.data
            })
        }
        catch(error){
            console.log(error)
        }
    }
}