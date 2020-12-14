import React from 'react'
import './LogOutButton.scss'
import {connect} from 'react-redux'

import {logOutAction} from '../../../redux/actions/logInOut'
import Button from '../../../templates/Button/Button'

const LogOutButton = props => {

    const {logOut} = props

    return (
        <Button
            {...{
                label: 'Log Out',
                transparent : true,
                red: true,
                onClick: logOut
            }}
        />
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(logOutAction())
    }
}

export default connect(null, mapDispatchToProps)(LogOutButton)