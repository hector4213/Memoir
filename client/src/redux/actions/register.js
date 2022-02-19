import api from './api'

export const registerUserAction = formInfo => {
	return async (dispatch, getState) => {
		const allFieldsFilled =
			formInfo &&
			formInfo.username &&
			formInfo.email &&
			formInfo.password &&
			formInfo.confirmPassword
		const passwordsMatch = formInfo.password === formInfo.confirmPassword

		if (allFieldsFilled) {
			if (passwordsMatch) {
				if (
					formInfo.username.length < 30 &&
					formInfo.email.length < 30 &&
					formInfo.password.length < 30
				) {
					delete formInfo.confirmPassword

					try {
						const response = await api.register(formInfo)
						localStorage.setItem('profile', JSON.stringify(response.data))

						dispatch({
							type: 'ERROR',
							payload: null,
						})

						dispatch({
							type: 'ADD_PROFILE',
							payload: response.data,
						})

						dispatch({
							type: 'TOGGLE_MODAL',
							payload: !getState().page.modal,
						})

						return true
					} catch (error) {
						if (error.response && error.response.data.error) {
							dispatch({
								type: 'ERROR',
								payload: error.response
									? error.response.data.error
									: error.message,
							})
						} else {
							dispatch({
								type: 'ERROR',
								payload: error.response ? error.response.data : error.message,
							})
						}
					}
				} else {
					dispatch({
						type: 'ERROR',
						payload: 'Fields can not be longer than 30 characters long',
					})
				}
			} else {
				dispatch({
					type: 'ERROR',
					payload: 'Password does not match confirmation',
				})
			}
		} else {
			dispatch({
				type: 'ERROR',
				payload: 'All input fields must be filled out',
			})
		}

		return false
	}
}
