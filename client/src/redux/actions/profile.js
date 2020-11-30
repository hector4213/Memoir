import axios from 'axios'

export const logInAction = formInfo => {
	return async (dispatch, getState) => {
        try{
            const response = await axios.post('http://localhost:3001/api/auth/login', formInfo)

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
        }
	}
}

export const registerUserAction = formInfo => {
	return async (dispatch, getState) => {
        if(formInfo.password === formInfo.confirmPassword){
            delete formInfo.confirmPassword

            try{
                const response = await axios.post('http://localhost:3001/api/auth/signup', formInfo)

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
            }
        }
	}
}