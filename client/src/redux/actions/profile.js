import axios from 'axios'

export const clearErrorAction = () => {
	return async (dispatch, getState) => {
            dispatch({
                type: 'PROFILE_ERROR',
                payload: null
            })
	}
}

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
            }
            catch(error){
                console.log(error.response.data.error)
                console.log(error)
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

export const registerUserAction = formInfo => {
	return async (dispatch, getState) => {

        if(formInfo && formInfo.username && formInfo.email && formInfo.password && formInfo.confirmPassword) {
            if(formInfo.password === formInfo.confirmPassword){
                delete formInfo.confirmPassword

                try{
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
                }

                catch(error){
                    console.log(error.response.data.error)
                    console.log(error)
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