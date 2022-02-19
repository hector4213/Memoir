import React from 'react'
import './ButtonsForStory.scss'

import { connect } from 'react-redux'
import { toggleModalAction } from '../../../../redux/actions/page'

import Button from '../../Button'
import GoToProfileButton from '../../Types/GoToProfile'
import GoHomeButton from '../../Types/GoHome'
import { Link } from 'react-router-dom'

const ButtonsForStory = ({
	storyId,
	toggleModal,
	authorId,
	user,
	setCurrentModal,
}) => {
	const userId = user ? user.id : null

	function btn_clicked(e) {
		e.preventDefault()
		setCurrentModal('login')
		toggleModal()
	}

	return (
		<>
			<GoHomeButton />

			{user ? (
				<div className='story-buttons'>
					<GoToProfileButton />

					<Link to={`/story/${storyId}/addEntry`}>
						<Button
							{...{
								label: 'Add an Entry',
								transparent: true,
								green: true,
							}}
						/>
					</Link>

					{userId === authorId ? (
						<>
							<Button
								{...{
									label: 'Edit this Story',
									transparent: true,
									extraClass: 'edit-story',
									onClick: e => {
										e.preventDefault()
										setCurrentModal('storyedit')
										toggleModal()
									},
								}}
							/>
						</>
					) : (
						''
					)}
				</div>
			) : (
				<Button
					{...{
						label: 'Create your own stories and entries',
						transparent: true,
						extraClass: 'story-login-btn',
						onClick: btn_clicked,
					}}
				/>
			)}
		</>
	)
}

const mapStateToProps = state => {
	return {
		user: state.profile.user,
		authorId: state.page.current.story.user.id,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		toggleModal: () => dispatch(toggleModalAction()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsForStory)
