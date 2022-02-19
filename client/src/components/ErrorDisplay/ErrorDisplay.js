import React from 'react'
import './ErrorDisplay.scss'

import GoHomeButton from '../../templates/Button/Types/GoHome'

const ErrorDisplay = props => {
	const { message } = props

	return (
		<div className='error-display'>
			<GoHomeButton />
			{message ? <div className='message'>{message}</div> : ''}
		</div>
	)
}

export default ErrorDisplay
