import React, {useEffect} from 'react'
import './Home.scss'

import Button from '../../components/Button/Button'
import GoToProfileButton from '../../components/ButtonTypes/GoToProfileButton/GoToProfileButton'
import Header from '../../components/Header/Header'
import StoryCard from '../../components/StoryCard/StoryCard'
import Modal from '../../components/Modal/Modal'
import LogInRegisterModal from '../../components/LogInRegister/LogInRegister'

import {connect} from 'react-redux'
import {toggleModalAction} from '../../redux/actions/page'
import {getAllStoriesAction} from '../../redux/actions/db_get'
import LogOutButton from '../../components/ButtonTypes/LogOutButton/LogOutButton'

import {useCallback} from 'react'
import {useHistory} from 'react-router-dom'

const Home = props => {
    const {toggleModal, getAllStories} = props
    const {user, modal, stories, path} = props

    useEffect(()=>{
        getAllStories()
    }, [getAllStories])


    // START OF REDIRECT
    const history = useHistory()
    const goToProfile = useCallback(() => history.push(`/profile`), [history])

    useEffect(()=>{
        if(path === 'loggedIn' || path === 'registeredUser'){ goToProfile() }
    },[path, goToProfile])
    // END OF REDIRECT


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

    if(cards.length === 0){
        return <div>Seems we don't have any cards try reloading the page or the server</div>
    }

    return (
    <div className='home'>

        {modal? <Modal> <LogInRegisterModal/> </Modal> : ''}

        {
        user?
        <div className='home-buttons'>
        <GoToProfileButton />
        <LogOutButton />
        </div>
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
    return {
        user: state.profile.user,
        modal: state.page.modal,
        stories: state.page.stories,
        path: state.page.path
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleModal: profile => dispatch(toggleModalAction()),
        getAllStories: () => dispatch(getAllStoriesAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)