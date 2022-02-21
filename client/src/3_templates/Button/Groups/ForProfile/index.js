import React from 'react'
import './ButtonsForProfile.scss'

import { connect } from 'react-redux'

import Button from '../..'
import GoHomeButton from '../../Types/GoHome'
import LogOutButton from '../../Types/LogOut'
import { toggleModalAction } from '../../../../redux/actions/page'
import Modal from '../../../../2_components/Modal/Modal'
import ProfileEdit from '../../../../1_controllers/Profile/Edit'

const ButtonsForProfile = props => {
	const { toggleModal, modal, showingPage } = props

	return (
		<>
			<GoHomeButton />

			<div className='profile-btns'>
				<Button
					{...{
						label: 'Edit Profile',
						onClick: () => toggleModal('editProfile'),
						transparent: true,
						extraClass: 'edit-profile-btn',
					}}
				/>

				<LogOutButton />

				{showingPage === 'editProfile' && modal ? (
					<Modal>
						{' '}
						<ProfileEdit />{' '}
					</Modal>
				) : (
					''
				)}
			</div>
		</>
	)
}

const mapStateToProps = state => {
	return {
		modal: state.page.modal,
		showingPage: state.page.showingPage,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		toggleModal: showingPage => dispatch(toggleModalAction(showingPage)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsForProfile)
