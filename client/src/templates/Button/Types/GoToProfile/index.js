import React from 'react'
import './GoToProfileButton.scss'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Button from '../../Button'

const GoToProfileButton = ({ user }) => {
	if (!user) return <div></div>

	return (
		<Link to={'/profile'}>
			<Button
				{...{
					label: `${user.username}'s Profile`,
					transparent: true,
					extraClass: 'profile-btn',
				}}
			/>
		</Link>
	)
}

const mapStateToProps = state => {
	return {
		user: state.profile.user,
	}
}
export default connect(mapStateToProps)(GoToProfileButton)
