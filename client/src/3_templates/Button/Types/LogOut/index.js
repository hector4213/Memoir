import React from 'react'
import './LogOutButton.scss'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logOutAction } from '../../../../redux/actions/logInOut'
import Button from '../..'

const LogOutButton = ({ logOut }) => {
	let navigate = useNavigate()

	function logOut_clicked() {
		logOut()
		navigate('/')
	}

	return (
		<Button
			{...{
				label: 'Log Out',
				extraClass: 'logout-button',
				transparent: true,
				red: true,
				onClick: logOut_clicked,
			}}
		/>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		logOut: () => dispatch(logOutAction()),
	}
}

export default connect(null, mapDispatchToProps)(LogOutButton)
