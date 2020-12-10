import axios from 'axios'

export const logInAction = formInfo => {
	return async (dispatch, getState) => {

        if(formInfo && formInfo.email && formInfo.password) {
            try{
                const response = await axios.post('http://localhost:3001/api/auth/login', formInfo)

                dispatch({
                    type: 'PROFILE_ERROR',
                    payload: null
                })
                dispatch({
                    type: 'ADD_PROFILE',
                    payload: response.data
                })
                dispatch({
                    type: 'TOGGLE_MODAL',
                    payload: !getState().page.modal
                })
                dispatch({
                    type: 'SET_PATH',
                    payload: 'loggedIn'
                })
                dispatch({
                    type: 'SET_PATH',
                    payload: null
                })

                localStorage.setItem('profile', JSON.stringify(response.data))

            }
            catch(error){
                dispatch({
                    type: 'PROFILE_ERROR',
                    payload: error.response.data.error
                })
            }
        } else {
            dispatch({
                type: 'PROFILE_ERROR',
                payload: 'All input fields must be filled out'
            })
        }
	}
}

export const logOutAction = () => {
    localStorage.clear()
	return async (dispatch, getState) => {

        // START OF PATH CHANGE
        dispatch({
            type: 'SET_PATH',
            payload: 'loggedOut'
        })

        dispatch({ type: 'REMOVE_PROFILE'})
    }
}
