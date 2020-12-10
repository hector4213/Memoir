import axios from 'axios'

export const logInAction = formInfo => {
	return async (dispatch, getState) => {

        if(formInfo && formInfo.email && formInfo.password) {
            try{
                const response = await axios.post('http://localhost:3001/api/auth/login', formInfo)

                dispatch({
                    type: 'ERROR',
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
                console.log({error})
                if(error.response.data.error){
                    dispatch({
                        type: 'ERROR',
                        payload: error.response? error.response.data.error : error.message
                    })
                } else {
                    dispatch({
                        type: 'ERROR',
                        payload: error.response? error.response.data : error.message
                    })
                }
            }
        } else {
            dispatch({
                type: 'ERROR',
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
