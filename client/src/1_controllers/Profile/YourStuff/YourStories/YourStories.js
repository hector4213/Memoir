import React from 'react'
import { HiPlus } from 'react-icons/hi'
import StoryCard from '../../../../2_components/StoryCard/StoryCard'
import './YourStories.scss'
import { connect } from 'react-redux'
import { toggleModalAction } from '../../../../redux/actions/page'
import Modal from '../../../../2_components/Modal/Modal'
import StoryCreate from '../../../Story/Create'

const YourStories = props => {
	const { toggleModal, modal, showingPage, myStories } = props

	let myEntryCards = []

	if (myStories) {
		myEntryCards = myStories.map(story => {
			return (
				<StoryCard
					{...{
						key: story.id,
						story: story,
						specialStyle: { opacity: 1 },
						deleteCard: true,
					}}
				/>
			)
		})
	}

	return (
		<div className='yourStories'>
			<label> Your Stories: </label>
			<div className='cards'>
				{myEntryCards}

				<div
					className='storyCard addStory'
					onClick={() => toggleModal('addStory')}
				>
					<div className='addStoryPlus'>
						<HiPlus />
					</div>
					<h1>Add Story</h1>
				</div>
			</div>

			{showingPage === 'addStory' && modal ? (
				<Modal>
					{' '}
					<StoryCreate />{' '}
				</Modal>
			) : (
				''
			)}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		modal: state.page.modal,
		showingPage: state.page.showingPage,
		myStories: state.profile.myStories,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		toggleModal: showingPage => dispatch(toggleModalAction(showingPage)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(YourStories)
