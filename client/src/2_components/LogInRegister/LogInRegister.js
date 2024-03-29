import React, { useState } from 'react'
import './LogInRegister.scss'

import { connect } from 'react-redux'

import RegisterForm from '../../3_templates/Forms/RegisterForm'
import { registerUserAction } from '../../redux/actions/register'

import LogInForm from '../../3_templates/Forms/LogInForm'
import { logInAction } from '../../redux/actions/logInOut'

import { clearErrorAction } from '../../redux/actions/page'

const LogInRegisterModal = ({ clearError, logIn, registerUser }) => {
	const [registerTab, isRegisterTab] = useState(true)

	return (
		<>
			<div className='modalTabs'>
				<button
					name='register'
					className={registerTab ? 'active' : ''}
					onClick={() => {
						clearError()
						isRegisterTab(true)
					}}
				>
					Register{' '}
				</button>

				<button
					name='login'
					className={registerTab ? '' : 'active'}
					onClick={() => {
						clearError()
						isRegisterTab(false)
					}}
				>
					Log In{' '}
				</button>
			</div>

			{registerTab ? (
				<RegisterForm {...{ registerUser }} />
			) : (
				<LogInForm {...{ logIn }} />
			)}
		</>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		logIn: profile => dispatch(logInAction(profile)),
		registerUser: formInfo => dispatch(registerUserAction(formInfo)),
		clearError: () => dispatch(clearErrorAction()),
	}
}
export default connect(null, mapDispatchToProps)(LogInRegisterModal)
