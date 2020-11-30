import React, {useState, useCallback} from 'react'
import {connect} from 'react-redux'
import { useHistory } from "react-router-dom";
import './Profile.scss'

import Button from '../../components/Button/Button'
import YourStuff from './YourStuff/YourStuff'
import OthersStuff from './OthersStuff/OthersStuff'

import {logOutAction} from '../../redux/actions/profile'

const Profile = props => {
    const [yourStuff, isYourStuff] = useState(true)
    const {user, logOut} = props
    const history = useHistory()
    const goHome = useCallback(() => history.push(`/`), [history])

    return (
        <div className='profile'>
            <Button
                {...{
                    label: 'Home',
                    transparent : true,
                    extraClass: 'back-btn',
                    onClick: goHome
                }}
            />
            <Button
                {...{
                    label: 'Log Out',
                    transparent : true,
                    extraClass: 'logout-btn',
                    onClick: () => {
                        logOut()
                        goHome()
                    }
                }}
            />
            <h1 className='pageTitle'>{user?user.username:'Not Logged In'}</h1>

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
        user: state.profile.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(logOutAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)