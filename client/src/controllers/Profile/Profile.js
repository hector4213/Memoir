import React, {useState} from 'react'
import {connect} from 'react-redux'
import './Profile.scss'

import YourStuff from './YourStuff/YourStuff'
import OthersStuff from './OthersStuff/OthersStuff'
import GoHomeButton from '../../components/ButtonTypes/GoHomeButton/GoHomeButton'
import ButtonsForProfile from '../ButtonGroups/ButtonsForProfile/ButtonsForProfile'

import {useCallback, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

const Profile = props => {
    const [yourStuff, isYourStuff] = useState(true)
    const {user, path} = props

    // START OF REDIRECT
    const history = useHistory()
    const goTo = useCallback(() => history.push(`/`), [history])
    const refreshPage = useCallback(() => history.go(0), [history])

    useEffect(()=>{
        if(path === 'createdStory' || path === 'deletedStory' || path === 'deletedEntry'){
            refreshPage()
        }
        if(path === 'loggedOut'){ goTo() }
    },[path, goTo, refreshPage])
    // END OF REDIRECT

    if(!user){
        return <div>You are not logged in</div>
    }

    return (
        <div className='profile'>
            <GoHomeButton />
            <ButtonsForProfile />

            <h1 className='pageTitle'>{user.username}</h1>

            <div className='tabs'>
                <button
                    className={yourStuff? 'active' : '' }
                    onClick={()=>isYourStuff(true)}
                >
                Your Stuff </button>

                <button
                    className={yourStuff? '' : 'active' }
                    onClick={()=>isYourStuff(false)}
                >
                Others Stuff </button>
            </div>

            {yourStuff? <YourStuff/> : <OthersStuff/> }
        </div>
    )
}

const mapStateToProps = state => {

    return {
        user: state.profile.user,
        path: state.page.path
    }
}

export default connect(mapStateToProps)(Profile)