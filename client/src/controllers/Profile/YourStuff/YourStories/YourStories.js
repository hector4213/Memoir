import React from 'react'
import { HiPlus } from "react-icons/hi";
import StoryCard from '../../../../components/StoryCard/StoryCard'
import './YourStories.scss'
import {connect} from 'react-redux'
import { toggleModalAction } from '../../../../redux/actions/page';
import Modal from '../../../../components/Modal/Modal';
import StoryCreate from '../../../StoryCreate/StoryCreate'

const YourStories = props => {
    const {toggleModal, modal, myStories} = props

    let myEntryCards = []

    if(myStories){
        myEntryCards = myStories.map(story => {
            return <StoryCard {...{
                key: story.id,
                story: story,
                specialStyle: {opacity: 1},
                // onClick: () => console.log('person clicked'),
                deleteCard: true
            }}/>
        })
    }

    return (
        <div className='yourStories'>

            {modal? <Modal> <StoryCreate/> </Modal>: ''}

            <label> Your Stories: </label>
                <div className='cards'>
                    {myEntryCards}
                    <div
                        className='storyCard addStory'
                        onClick={toggleModal}
                    >
                        <div className='addStoryPlus'>
                        <HiPlus/>
                        </div>
                        <h1>Add Story</h1>
                    </div>
                </div>
            </div>
    )
}

const mapStateToProps = state => {
    return {
        modal: state.page.modal,
        myStories: state.profile.myStories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleModal: () => dispatch(toggleModalAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(YourStories)