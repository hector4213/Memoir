import React, {useEffect} from 'react'
import './Home.scss'

import Button from '../../components/Button/Button'
import GoToProfileButton from '../../components/GoToProfileButton/GoToProfileButton'
import Header from '../../components/Header/Header'
import StoryCard from '../../components/StoryCard/StoryCard'
import Modal from '../../components/Modal/Modal'
import LogInRegisterModal from '../../components/LogInRegister/LogInRegister'

import {connect} from 'react-redux'
import {toggleModalAction} from '../../redux/actions/page'
import {logOutAction} from '../../redux/actions/profile'
import {getAllStoriesAction} from '../../redux/actions/get'

const Index = props => {
    const {toggleModal, logOut, getAllStories} = props
    const {user, modal, stories} = props

    useEffect(()=>{
        getAllStories()
    }, [getAllStories])

    let cards = []

    if(stories){
        stories.forEach((story, i) => {
            cards.push(
                <StoryCard
                    {...{
                        key: i,
                        story: story
                    }}
                />
            )
        })
    }


    return (
    <div className='home'>

        {modal? <Modal> <LogInRegisterModal/> </Modal> : ''}

        {
        user?
        <>
        <GoToProfileButton />
        <Button
            {...{
                label: 'Log Out',
                transparent : true,
                extraClass: 'logout-btn',
                onClick: logOut
            }}
        />
        </>
        :
        <Button
            {...{
                label: 'Register | Log In',
                transparent : true,
                extraClass: 'login-btn',
                onClick: toggleModal
            }}
        />
        }

        <Header />

        <div className='storyCards'>
            {cards}
        </div>

    </div>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.profile.user,
        modal: state.page.modal,
        stories: state.page.stories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleModal: profile => dispatch(toggleModalAction()),
        logOut: () => dispatch(logOutAction()),
        getAllStories: () => dispatch(getAllStoriesAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)