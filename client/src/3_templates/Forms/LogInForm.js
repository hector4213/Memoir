import React, { useState } from 'react'
import './FormStyle.scss'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'

const LogInForm = ({ logIn }) => {
	let navigate = useNavigate()

	const [formInfo, setFormInfo] = useState()

	async function loginRequest(e) {
		e.preventDefault()
		const loggedIn = await logIn(formInfo)
		if (loggedIn) navigate('/profile')
	}

	return (
		<form>
			<input
				type='text'
				name='email'
				placeholder='Enter your E-mail'
				onChange={e => {
					setFormInfo({ ...formInfo, email: e.target.value })
				}}
			/>

			<input
				type='password'
				name='password'
				placeholder='Enter your Password'
				onChange={e => {
					setFormInfo({ ...formInfo, password: e.target.value })
				}}
			/>

			<Button
				{...{
					label: 'Submit',
					extraClass: 'submit-login',
					transparent: false,
					onClick: loginRequest,
				}}
			/>
		</form>
	)
}

export default LogInForm
