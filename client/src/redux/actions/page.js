
export const toggleModalAction = () => {
	return async (dispatch, getState) => {
        dispatch({
            type: 'TOGGLE_MODAL',
            payload: !getState().page.modal
        })
	}
}