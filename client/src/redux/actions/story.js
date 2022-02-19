import api from './api'

export const getAllStoriesAction = () => {
	return async (dispatch, getState) => {
		try {
			const res = await api.getAllStories()

			dispatch({
				type: 'SET_ALL_STORIES',
				payload: res.data,
			})
		} catch (error) {
			dispatch({
				type: 'ERROR',
				payload: error.response ? error.response.data.error : error.message,
			})
		}
	}
}

export const getSingleStoryAction = storyId => {
	return async (dispatch, getState) => {
		try {
			const response = await api.getStory(storyId)
			let sortedEntries = response.data.entries

			if (sortedEntries.length > 0) {
				sortedEntries = sortedEntries.sort((a, b) => {
					return new Date(a.date) - new Date(b.date)
				})
			}

			dispatch({
				type: 'CURRENT_STORY',
				payload: { ...response.data, entries: sortedEntries },
			})
		} catch (error) {
			dispatch({
				type: 'ERROR',
				payload: error.response ? error.response.data.error : error.message,
			})
		}
	}
}

export const editStoryAction = entryInfo => {
	return async (dispatch, getState) => {
		const token = getState().profile.token
		const storyId = getState().page.current.story.id

		try {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: `bearer ${token}`,
			}

			await api.editStory(storyId, entryInfo, headers)

			dispatch({
				type: 'TOGGLE_MODAL',
				payload: false,
			})

			// after editing get revised story

			const response = await api.getStory(storyId)
			let sortedEntries = response.data.entries

			if (sortedEntries.length > 0) {
				sortedEntries = sortedEntries.sort((a, b) => {
					return new Date(a.date) - new Date(b.date)
				})
			}

			dispatch({
				type: 'CURRENT_STORY',
				payload: { ...response.data, entries: sortedEntries },
			})
		} catch (error) {
			dispatch({
				type: 'ERROR',
				payload: error.response ? error.response.data.error : error.message,
			})
		}
	}
}

export const createStoryAction = formInfo => {
	return async (dispatch, getState) => {
		const token = getState().profile.token
		const userId = getState().profile.user.id

		try {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: `bearer ${token}`,
			}

			await api.createStory(formInfo, headers)

			dispatch({
				type: 'TOGGLE_MODAL',
				payload: false,
			})

			// after create story add it to profile

			const response = await api.getProfile(userId, headers)

			dispatch({
				type: 'ADD_ENTRIES_STORIES',
				payload: {
					myStories: response.data.stories,
					myEntries: response.data.userEntries,
				},
			})
		} catch (error) {
			dispatch({
				type: 'ERROR',
				payload: error.response ? error.response.data.error : error.message,
			})
		}
	}
}

export const deleteStoryAction = storyId => {
	return async (dispatch, getState) => {
		const userId = getState().profile.user.id
		const token = getState().profile.token
		try {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: `bearer ${token}`,
			}

			await api.deleteStory(storyId, headers)

			dispatch({
				type: 'TOGGLE_MODAL',
				payload: false,
			})

			const response = await api.getProfile(userId, headers)

			dispatch({
				type: 'ADD_ENTRIES_STORIES',
				payload: {
					myStories: response.data.stories,
					myEntries: response.data.userEntries,
				},
			})

			return true
		} catch (error) {
			dispatch({
				type: 'ERROR',
				payload: error.response ? error.response.data.error : error.message,
			})
		}
	}
}
