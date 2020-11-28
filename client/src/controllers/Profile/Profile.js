import React, {useState} from 'react'
import './Profile.scss'

import YourStuff from './YourStuff/YourStuff'
import OthersStuff from './OthersStuff/OthersStuff'

const Profile = props => {
    const [yourStuff, isYourStuff] = useState(true)

    return (
        <div className='profile'>
            <h1 className='pageTitle'>Username</h1>

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

export default Profile