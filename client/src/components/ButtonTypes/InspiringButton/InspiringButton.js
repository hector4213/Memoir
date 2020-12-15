import React from 'react'
import './InspiringButton.scss'

import {connect} from 'react-redux'
import {addInspiringAction} from '../../../redux/actions/inspiring'

import Button from '../../../templates/Button/Button'
import {HiOutlineLightningBolt} from 'react-icons/hi'

const InspiringButton = props => {
    const {story, addInspiring, inspired, clickFunc} = props

    let classes = 'insp-btn '
    classes += inspired? 'clicked' : ''

    return (
        <Button {...{
            label: story ? `${story.id} people found this story inspiring` : 'Inspiring',
            // onClick: story ? addInspiring : '',
            onClick: clickFunc,
            transparent: true,
            icon: <HiOutlineLightningBolt />,
            extraClass: classes,
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