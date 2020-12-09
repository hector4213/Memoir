

export const setPathAction = path => {
	return async (dispatch, getState) => {
        console.log('inside of set path action')

        dispatch({
            type: 'SET_PATH',
            payload: path
        })
	}
}

export const toggleModalAction = () => {
	return async (dispatch, getState) => {
        dispatch({
            type: 'TOGGLE_MODAL',
            payload: !getState().page.modal
        })
	}
}

export const setErrorAction = errorMessage => {
	return async (dispatch, getState) => {
        dispatch({
            type: 'ERROR',
            payload: errorMessage
        })
	}
}

export const clearErrorAction = () => {
	return async (dispatch, getState) => {
            dispatch({
                type: 'PROFILE_ERROR',
                payload: null
            })
	}
}