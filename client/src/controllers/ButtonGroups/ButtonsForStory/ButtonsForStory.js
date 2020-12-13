import React, {useCallback} from 'react'
import './ButtonsForStory.scss'

import {useHistory} from "react-router-dom";
import {connect} from 'react-redux'
import {toggleModalAction} from '../../../redux/actions/page'

import Button from '../../../templates/Button/Button'
import Modal from '../../../components/Modal/Modal'
import StoryEdit from '../../../controllers/StoryEdit/StoryEdit'
import GoToProfile from '../../../components/ButtonTypes/GoToProfileButton/GoToProfileButton'
import GoHomeButton from '../../../components/ButtonTypes/GoHomeButton/GoHomeButton'

const ButtonsForStory = props => {
    const {storyId, toggleModal, modal, authorId, user} = props
    const userId = user ? user.id : null

    const history = useHistory()
    const gotoCreate = useCallback(() => history.push(`/story/${storyId}/addEntry`), [history, storyId])

    return (
        <>
            <GoHomeButton />


            {
                user?
                <div className='story-buttons'>
                    <GoToProfile />

                    <Button {...{
                        label: 'Add an Entry',
                        transparent: true,
                        extraClass:'add-entry-btn',
                        onClick: gotoCreate
                    }} />

                    {
                        userId === authorId?
                        <>
                        <Button {...{
                            label: 'Edit this Story',
                            transparent: true,
                            extraClass:'',
                            onClick: toggleModal
                        }} />
                        </>
                        : ''
                    }
                </div>
                : ''
            }

            {modal? <Modal> <StoryEdit/> </Modal> : ''}

        </>
    )
}

const mapStateToProps = state => {
    return {
        modal: state.page.modal,
        user: state.profile.user,
        authorId: state.page.current.story.user.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleModal: () => dispatch(toggleModalAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsForStory)