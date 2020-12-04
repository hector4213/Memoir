import React from 'react'
import { HiPlus } from "react-icons/hi";
import StoryCard from '../../../../components/StoryCard/StoryCard'
import './YourStories.scss'
import {connect} from 'react-redux'
import { toggleModalAction } from '../../../../redux/actions/page';
import Modal from '../../../../components/Modal/Modal';
import StoryCreate from '../../../../components/StoryCreate/StoryCreate';

const YourStories = props => {
    const {toggleModal, modal} = props

    return (
        <div className='yourStories'>
            {modal? <Modal><StoryCreate/></Modal>: ''}
            <label> Your Stories: </label>
                <div className='cards'>
                    <StoryCard {...{
                        imageUrl: 'https://tinyurl.com/yy23tqm5',
                        name: 'Michael Angelo',
                        occupation: 'Ninja Turtle',
                        onClick: () => console.log('person clicked'),
                        deleteCard: true
                    }}/>

                    <StoryCard {...{
                        imageUrl: 'https://static.wikia.nocookie.net/tmnt2012series/images/1/1f/2DRaph.jpeg',
                        name: 'Raphael',
                        occupation: 'Ninja Turtle',
                        onClick: () => console.log('person clicked'),
                        deleteCard: true
                    }} />

                    <StoryCard {...{
                        imageUrl: 'https://tinyurl.com/y2ur64kv',
                        name: 'Leonardo',
                        occupation: 'Ninja Turtle',
                        onClick: () => console.log('person clicked'),
                        deleteCard: true
                    }} />

                    <StoryCard {...{
                        imageUrl: 'https://media.giphy.com/media/cFdHXXm5GhJsc/source.gif',
                        name: 'Donatello',
                        occupation: 'Ninja Turtle',
                        onClick: () => console.log('person clicked'),
                        deleteCard: true
                    }} />

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
        modal: state.page.modal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleModal: () => dispatch(toggleModalAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(YourStories)