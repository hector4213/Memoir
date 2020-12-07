import React, {useCallback} from 'react'
import './GoHomeButton.scss'

import {useHistory} from 'react-router-dom'
import Button from '../../Button/Button'

const GoHomeButton = props => {
    const history = useHistory()
    const goHome = useCallback(() => history.push(`/`), [history])

    return (
        <Button
            {...{
                label: 'Home',
                transparent : true,
                extraClass: 'back-btn',
                onClick: goHome
            }}
        />
    )
}

export default GoHomeButton