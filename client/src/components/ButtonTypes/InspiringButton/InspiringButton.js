import React from 'react'
import './InspiringButton.scss'

import {connect} from 'react-redux'
import {addInspiringAction} from '../../../redux/actions/inspiring'

import Button from '../../../templates/Button/Button'

const InspiringButton = props => {

    const {story, addInspiring} = props

    return (
        <Button {...{
            label: story ? `Inspiring ${story.id}` : 'Inspiring',
            onClick: story ? addInspiring : '',
            transparent: true,
            extraClass: 'insp-btn',
        }}/>
    )
}

const mapStateToProps = state => {
    return {
        story: state.page.current.story
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addInspiring: () => dispatch(addInspiringAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InspiringButton)