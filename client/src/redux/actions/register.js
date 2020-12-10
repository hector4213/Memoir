import axios from 'axios'

export const registerUserAction = formInfo => {
	return async (dispatch, getState) => {

        if(formInfo && formInfo.username && formInfo.email && formInfo.password && formInfo.confirmPassword) {
            if(formInfo.password === formInfo.confirmPassword){
                delete formInfo.confirmPassword

                try {
                    const response = await axios.post('http://localhost:3001/api/auth/signup', formInfo)

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

                    // START OF PATH CHANGE
                    dispatch({
                        type: 'SET_PATH',
                        payload: 'registeredUser'
                    })
                    // needs to be set back to null
                    dispatch({
                        type: 'SET_PATH',
                        payload: null
                    })
                    // END OF PATH CHANGE
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
                    payload: 'Password does not match confirmation'
                })
            }
        }

        else {
            dispatch({
                type: 'PROFILE_ERROR',
                payload: 'All input fields must be filled out'
            })
        }
	}
}