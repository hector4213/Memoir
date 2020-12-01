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

const Index = props => {
    const {toggleModal, storedProfile} = props
    const {user, modal} = props

    const history = useHistory()
    const goToProfile = useCallback(() => history.push(`/profile`), [history])


    useEffect(()=>{
        storedProfile()
    }, [storedProfile])

    let cards = []

    // dummy cards
    for(let i=0; i<8; i++){
        cards.push(
            <StoryCard
                {...{
                    key: i,
                    imageUrl: 'https://tinyurl.com/y37j647a',
                    name: 'Jack Jack',
                    occupation: 'The Incredibles'
                }}
            />
        )
    }



    return (
    <div className='home'>

        {modal? <Modal {...{toggleModal}} /> : ''}

        {
        user?
        <Button
            {...{
                label: user.username,
                transparent : true,
                extraClass: 'login-btn',
                onClick: goToProfile
            }}
        />:
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
        modal: state.page.modal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleModal: profile => dispatch(toggleModalAction()),
        storedProfile: () => dispatch(storedProfileAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)