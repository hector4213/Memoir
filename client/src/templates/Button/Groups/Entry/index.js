import React from 'react'
import './ButtonsForEntry.scss'

import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import Button from '../../Button'
import GoToProfile from '../../Types/GoToProfile'
import GoHomeButton from '../../Types/GoHome'
import GoToStoryButton from '../../Types/GoToStory'

const ButtonsForEntry = ({ user, authorId }) => {
	const { storyId, entryId } = useParams()

	const userId = user ? user.id : null

	return (
		<>
			<GoHomeButton />
			<GoToStoryButton />

			{user && (
				<div className='story-buttons'>
					<GoToProfile />

					{userId === authorId && (
						<Link to={`/story/${storyId}/entry/${entryId}/editEntry`}>
							<Button
								{...{
									label: 'Edit this Entry',
									transparent: true,
									extraClass: 'editEntry-button',
								}}
							/>
						</Link>
					)}
				</div>
			)}
		</>
	)
}

const mapStateToProps = state => {
	return {
		user: state.profile.user,
		authorId: state.page.current.entry.user.id,
	}
}

export default connect(mapStateToProps)(ButtonsForEntry)
