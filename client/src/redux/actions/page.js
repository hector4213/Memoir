

export const toggleModalAction = () => {
	return async (dispatch, getState) => {
        dispatch({
            type: 'TOGGLE_MODAL',
            payload: !getState().page.modal
        })
	}
}

export const setCurrentStoryAction = storyId => {
	return async (dispatch, getState) => {
        dispatch({
            type: 'CURRENT_STORY',
            payload: storyId
        })
	}
}

export const setCurrentEntryAction = storyId => {
	return async (dispatch, getState) => {
        dispatch({
            type: 'CURRENT_ENTRY',
            payload: storyId
        })
	}
}