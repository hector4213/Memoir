
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