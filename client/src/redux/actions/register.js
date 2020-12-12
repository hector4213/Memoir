import axios from 'axios'
import {history} from '../../index'

export const registerUserAction = formInfo => {
	return async (dispatch, getState) => {

        if(formInfo && formInfo.username && formInfo.email && formInfo.password && formInfo.confirmPassword) {
            if(formInfo.password === formInfo.confirmPassword){
                delete formInfo.confirmPassword

                try {
                    const response = await axios.post('http://localhost:3001/api/auth/signup', formInfo)
                    localStorage.setItem('profile', JSON.stringify(response.data))

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

                    history.pushState('/profile')
                }

                catch(error){
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
                    payload: 'Password does not match confirmation'
                })
            }
        }

        else {
            dispatch({
                type: 'ERROR',
                payload: 'All input fields must be filled out'
            })
        }
	}
}