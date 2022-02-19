import React from 'react'
import './ButtonsForHome.scss'

import { connect } from 'react-redux'

import GoToProfileButton from '../../../components/ButtonTypes/GoToProfile'
import LogOutButton from '../../../components/ButtonTypes/LogOut'
import Button from '../../../templates/Button/Button'

import { toggleModalAction } from '../../../redux/actions/page'

const ButtonsForHome = props => {
	const { user, toggleModal } = props

	return (
		<div className='home-buttons'>
			{user ? (
				<>
					<GoToProfileButton />
					<LogOutButton />
				</>
			) : (
				<Button
					{...{
						label: 'Register | Log In',
						transparent: true,
						extraClass: 'login-btn',
						onClick: toggleModal,
					}}
				/>
			)}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		user: state.profile.user,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		toggleModal: () => dispatch(toggleModalAction()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsForHome)
