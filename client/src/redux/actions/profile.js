import axios from 'axios'

export const getMyProfileStuffAction = () => {
	return async (dispatch, getState) => {
        const userId = getState().profile.user.id
        const token = getState().profile.token

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        }

        try {
            const response = await axios.get(`http://localhost:3001/api/profile/${userId}`, {headers: headers})

            dispatch({
                type: 'ADD_ENTRIES_STORIES',
                payload: {myStories: response.data.stories, myEntries: response.data.userEntries}
            })
        }
        catch(error){
            console.log(error)
        }
    }
}

export const storedProfileAction = formInfo => {
	return async (dispatch, getState) => {
        const retrievedProfile = localStorage.getItem('profile');
        if(retrievedProfile){
            const storedProfile = JSON.parse(retrievedProfile)
            dispatch({
                type: 'ADD_PROFILE',
                payload: storedProfile
            })
        }
    }
}