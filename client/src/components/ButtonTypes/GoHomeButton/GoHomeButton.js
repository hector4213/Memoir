import React, {useCallback} from 'react'
import './HomeButton.scss'

import {useHistory} from 'react-router-dom'
import Button from '../Button/Button'

const HomeButton = props => {
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

export default HomeButton