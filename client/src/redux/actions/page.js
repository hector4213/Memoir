

export const setPathAction = path => {
	return async (dispatch, getState) => {
        console.log('inside of set path action')

        dispatch({
            type: 'SET_PATH',
            payload: path
        })
	}
}

export const toggleModalAction = (showPage) => {
	return async (dispatch, getState) => {
        if(showPage){
            dispatch({
                type: 'TOGGLE_MODAL',
                payload: !getState().page.modal,
                showingPage: showPage
            })
        } else {
            dispatch({
                type: 'TOGGLE_MODAL',
                payload: !getState().page.modal,
                showingPage: null
            })
        }
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