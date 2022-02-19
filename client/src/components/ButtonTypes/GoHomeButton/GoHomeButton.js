import React from 'react'
import './GoHomeButton.scss'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import Button from '../../../templates/Button/Button'

import { clearErrorAction } from '../../../redux/actions/page'

const GoHomeButton = ({ clearError }) => {
	return (
		<Link to={'/'}>
			<Button
				{...{
					label: 'Home',
					transparent: true,
					extraClass: 'back-btn',
					onClick: e => clearError(),
				}}
			/>
		</Link>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		clearError: () => dispatch(clearErrorAction()),
	}
}

export default connect(null, mapDispatchToProps)(GoHomeButton)
