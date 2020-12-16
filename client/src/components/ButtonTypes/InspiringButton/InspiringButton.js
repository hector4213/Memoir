import React from 'react'
import './InspiringButton.scss'

import {connect} from 'react-redux'
import {addInspiringAction} from '../../../redux/actions/inspiring'

import Button from '../../../templates/Button/Button'
import {HiOutlineLightningBolt} from 'react-icons/hi'

const InspiringButton = props => {
    const {story, user, addInspiring} = props

    const clickedBefore = story.inspiredBy.find( i => i.id === user.id)

    let classes = 'insp-btn '
    classes += clickedBefore? 'clicked' : ''


    let inspiredLabel
    if(story.inspiredBy.length > 1){
        inspiredLabel = `${story.inspiredBy.length} people found this story inspiring`
    }
    else if(story.inspiredBy.length === 1){
        inspiredLabel = '1 person found this story inspiring'
    }
    else {
        inspiredLabel = 'Do you find this story inspiring ?'
    }

    return (
        <Button {...{
            label: inspiredLabel,
            onClick: addInspiring,
            transparent: true,
            icon: <HiOutlineLightningBolt />,
            extraClass: classes,
        }}/>
    )
}

const mapStateToProps = state => {
    return {
        story: state.page.current.story,
        user: state.profile.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addInspiring: () => dispatch(addInspiringAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InspiringButton)