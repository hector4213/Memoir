import React, {useCallback} from 'react'
import './GoHomeButton.scss'

import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import Button from '../../../templates/Button/Button'

import {clearErrorAction} from '../../../redux/actions/page'

const GoHomeButton = props => {
    const {clearError} = props
    const history = useHistory()
    const goHome = useCallback(() => history.push(`/`), [history])

    return (
        <Button
            {...{
                label: 'Home',
                transparent : true,
                extraClass: 'back-btn',
                onClick:  e => {
                    clearError()
                    goHome()
                }
            }}
        />
    )
}

const mapDispatchToProps = dispatch => {
    return {
        clearError: () => dispatch(clearErrorAction())
    }
}

export default connect(null, mapDispatchToProps)(GoHomeButton)