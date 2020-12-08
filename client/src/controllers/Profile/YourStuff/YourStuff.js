import React, { useEffect } from 'react'
import './YourStuff.scss'
import YourStories from './YourStories/YourStories'
import YourEntries from './YourEntries/YourEntries'
import {connect} from 'react-redux'

import {getMyProfileStuffAction} from '../../../redux/actions/profile'

const YourStuff = props => {
    const {getMyProfileStuff} = props

    useEffect(()=>{
        getMyProfileStuff()
    },[getMyProfileStuff])

    return (
        <div className='yourStuff'>
            <YourStories/>
            <YourEntries />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        getMyProfileStuff: () => dispatch(getMyProfileStuffAction())
    }
}

export default connect(null, mapDispatchToProps)(YourStuff)