import React, {useCallback} from 'react'
import './StoryButtons.scss'

import {useHistory} from "react-router-dom";
import {connect} from 'react-redux'
import {toggleModalAction} from '../../redux/actions/page'

import Button from '../Button/Button'
import Modal from '../Modal/Modal'
import StoryEdit from '../StoryEdit/StoryEdit';
import GoToProfile from '../GoToProfileButton/GoToProfileButton';

const StoryButtons = props => {
    const {storyId, toggleModal, modal, userId, authorId} = props

    const history = useHistory()
    const gotoCreate = useCallback(() => history.push(`/story/${storyId}/addEntry`), [history, storyId])

    return (
        <div className='story-buttons'>
            <GoToProfile />

            <Button {...{
                label: 'Add an Entry',
                transparent: true,
                extraClass:'',
                onClick: gotoCreate
            }} />

            {userId === authorId?
                <>
                <Button {...{
                    label: 'Edit Story',
                    transparent: true,
                    extraClass:'',
                    onClick: toggleModal
                }} />
                {modal? <Modal> <StoryEdit/> </Modal> : ''}
                </>
                : ''
            }

        </div>
    )
}

const mapStateToProps = state => {
    return {
        modal: state.page.modal,
        user: state.profile.user,
        userId: state.profile.user.id,
        authorId: state.page.current.story.user.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleModal: () => dispatch(toggleModalAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryButtons)