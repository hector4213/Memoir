import React from 'react'
import { Link, useParams } from 'react-router-dom'

import Button from '../../../templates/Button/Button'

const GoToEntryButton = () => {
	const { storyId, entryId } = useParams()

	return (
		<Link to={`/story/${storyId}/entry/${entryId}`}>
			<Button
				{...{
					label: 'Back to Entry',
					transparent: true,
					extraClass: 'gotostory-btn',
				}}
			/>
		</Link>
	)
}

export default GoToEntryButton
