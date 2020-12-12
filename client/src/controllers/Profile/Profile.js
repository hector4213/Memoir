import React, {useState} from 'react'
import {connect} from 'react-redux'
import './Profile.scss'

import YourStuff from './YourStuff/YourStuff'
import OthersStuff from './OthersStuff/OthersStuff'
import ButtonsForProfile from '../ButtonGroups/ButtonsForProfile/ButtonsForProfile'

import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay'

const Profile = props => {
    const [yourStuff, isYourStuff] = useState(true)
    const {user} = props

    if(!user){
        return <ErrorDisplay />
    }

    return (
        <div className='profile'>
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
    }
}

export default connect(mapStateToProps)(Profile)