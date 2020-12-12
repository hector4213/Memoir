import React from 'react'
import './ButtonsForProfile.scss'

import {connect} from 'react-redux'

import Button from '../../../components/Button/Button'
import GoHomeButton from '../../../components/ButtonTypes/GoHomeButton/GoHomeButton'
import LogOutButton from '../../../components/ButtonTypes/LogOutButton/LogOutButton'
import { toggleModalAction } from '../../../redux/actions/page'
import Modal from '../../../components/Modal/Modal'
import ProfileEdit from '../../ProfileEdit/ProfileEdit'

const ButtonsForProfile = props => {

    const {toggleModal, modal, showingPage} = props

    return (
        <>
            <GoHomeButton />

            <div className='profile-btns'>

                <Button {...{
                    label: 'Edit Profile',
                    onClick: () => toggleModal('editProfile'),
                    transparent: true,
                    extraClass: 'edit-profile-btn'
                } } />

                <LogOutButton />

                {showingPage === 'editProfile' && modal? <Modal> <ProfileEdit/> </Modal> : ''}
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
        toggleModal: (showingPage) => dispatch(toggleModalAction(showingPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsForProfile)