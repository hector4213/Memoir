import React, {useState} from 'react'
import {connect} from 'react-redux'
import './Profile.scss'

import YourStuff from './YourStuff/YourStuff'
// import OthersStuff from './OthersStuff/OthersStuff'
import GoHomeButton from '../../components/ButtonTypes/GoHomeButton/GoHomeButton'

const Profile = props => {
    const [yourStuff, isYourStuff] = useState(true)
    const {user} = props

    return (
        <div className='profile'>
            <GoHomeButton />

            <h1 className='pageTitle'>{user?user.username:'Not Logged In'}</h1>

            <div className='tabs'>
                <button
                    className={yourStuff? 'active' : '' }
                    onClick={()=>isYourStuff(true)}
                >
                Your Stuff </button>

                {/* <button
                    className={yourStuff? '' : 'active' }
                    onClick={()=>isYourStuff(false)}
                >
                Others Stuff </button> */}
            </div>


            <YourStuff/>
            {/* {yourStuff? <YourStuff/> : <OthersStuff/> } */}
        </div>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.profile.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)