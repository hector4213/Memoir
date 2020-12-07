import React, {useCallback} from 'react'
import './GoToProfileButton.scss'
import {connect} from 'react-redux'

import {useHistory} from 'react-router-dom'
import Button from '../Button/Button'

const GoToProfile = props => {
    const {name} = props
    const history = useHistory()
    const goProfile = useCallback(() => history.push(`/profile`), [history])

    return (
        <Button
            {...{
                label: `${name}'s Profile`,
                transparent : true,
                extraClass: 'profile-btn',
                onClick: goProfile
            }}
        />
    )
}

const mapStateToProps = state => {
    return {
        name: state.profile.user.username
    }
}
export default connect(mapStateToProps)(GoToProfile)