import React, {useCallback} from 'react'
import './ButtonsForEntry.scss'

import {useHistory, useParams} from "react-router-dom";
import {connect} from 'react-redux'

import Button from '../../Button/Button'
import GoToProfile from '../..//ButtonTypes/GoToProfileButton/GoToProfileButton'

const ButtonsForEntry = props => {
    const {user, authorId} = props
    const { storyId, entryId } = useParams()

    const userId = user? user.id : null

    const history = useHistory()
    const gotoEdit = useCallback(() => history.push(`/story/${storyId}/entry/${entryId}/editEntry`), [history, storyId, entryId])

    return (
        <div className='story-buttons'>
            <GoToProfile />

            {userId === authorId?
                <Button {...{
                    label: 'Edit this Entry',
                    transparent: true,
                    extraClass:'',
                    onClick: gotoEdit
                }} />
                : ''
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.profile.user,
        authorId: state.page.current.entry[0].user.id
    }
}

export default connect(mapStateToProps)(ButtonsForEntry)