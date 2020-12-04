import React, {useEffect, useCallback} from 'react'
import { useHistory } from "react-router-dom";
import './Home.scss'

import Button from '../../components/Button/Button'
import Header from '../../components/Header/Header'
import StoryCard from '../../components/StoryCard/StoryCard'
import Modal from '../../components/Modal/Modal'

import {connect} from 'react-redux'
import {toggleModalAction} from '../../redux/actions/page'
import {storedProfileAction} from '../../redux/actions/profile'
import {logOutAction} from '../../redux/actions/profile'
import {getAllStoriesAction} from '../../redux/actions/get'

const Index = props => {
    const {toggleModal, storedProfile, logOut, getAllStories} = props
    const {user, modal, stories} = props

    const history = useHistory()
    const goToProfile = useCallback(() => history.push(`/profile`), [history])

    useEffect(()=>{
        getAllStories()
        storedProfile()
    }, [storedProfile, getAllStories])

    let cards = []

    if(stories){
        for(let i=0; i<8; i++){
            const story = stories[i]
            cards.push(
                <StoryCard
                    {...{
                        key: i,
                        imageUrl: story.story_img,
                        name: story.name,
                        occupation: story.occupation
                    }}
                />
            )
        }
    }



    return (
    <div className='home'>

        {modal? <Modal {...{toggleModal}} /> : ''}

        {
        user?
        <>
        <Button
            {...{
                label: `${user.username}'s Profile`,
                transparent : true,
                extraClass: 'login-btn',
                onClick: goToProfile
            }}
        />
        <Button
                {...{
                    label: 'Log Out',
                    transparent : true,
                    extraClass: 'logout-btn',
                    onClick: () => {
                        logOut()
                    }
                }}
        />
        </> :
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
        storedProfile: () => dispatch(storedProfileAction()),
        logOut: () => dispatch(logOutAction()),
        getAllStories: () => dispatch(getAllStoriesAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)