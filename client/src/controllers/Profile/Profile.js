import React, {useState, useCallback} from 'react'
import {connect} from 'react-redux'
import { useHistory } from "react-router-dom";
import './Profile.scss'

import Button from '../../components/Button/Button'
import YourStuff from './YourStuff/YourStuff'
import OthersStuff from './OthersStuff/OthersStuff'

const Profile = props => {
    const [yourStuff, isYourStuff] = useState(true)
    const {user} = props
    const history = useHistory()
    const goHome = useCallback(() => history.push(`/`), [history])

    return (
        <div className='profile'>
            <Button
                {...{
                    label: 'back',
                    transparent : true,
                    // extraClass: 'login-btn',
                    onClick: goHome
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)