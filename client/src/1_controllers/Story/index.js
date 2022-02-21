import React, { useState, useEffect } from 'react'
import './Story.scss'

import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import StoryCard from '../../2_components/StoryCard/StoryCard'
import TimelineCard from '../../2_components/TimelineCard/TimelineCard'
import ButtonsForStory from '../../3_templates/Button/Groups/ForStory'
import ErrorDisplay from '../../2_components/ErrorDisplay/ErrorDisplay'

import { getSingleStoryAction } from '../../redux/actions/story'
import InspiringButton from '../../3_templates/Button/Types/Inspiring'
import FilterNav from './FilterNav/FilterNav'
import Modal from '../../2_components/Modal/Modal'
import LogInRegisterModal from '../../2_components/LogInRegister/LogInRegister'
import StoryEdit from '../../1_controllers/Story/Edit'

const Story = ({ getSingleStory, current, modal }) => {
	const [filter, setFilter] = useState(null)
	const [currentModal, setCurrentModal] = useState()

	const story = current ? current.story : null
	const { storyId } = useParams()

	useEffect(() => getSingleStory(storyId), [getSingleStory, storyId])

	// PROGRESS BAR
	const [currentProgress, setCurrentProgress] = useState(0)
	useEffect(() => {
		window.addEventListener('scroll', changeProgress)

		return () => {
			window.removeEventListener('scroll', changeProgress)
		}
	}, [])

	const changeProgress = e => {
		e.preventDefault()
		const height = document.body.clientHeight - window.innerHeight
		const current = window.scrollY
		const total = (current / height) * 100

		setCurrentProgress(total)
	}

	if (!story) {
		return <ErrorDisplay />
	} else {
		const viewableEntries = () => {
			if (filter) {
				const filteredStories = story.entries.filter(
					entry => entry.format_id === filter,
				)
				if (filteredStories.length > 0) {
					return createTimelineCards(filteredStories)
				} else {
					return (
						<div className='filter-error'>
							There are no entries that match that filter.
						</div>
					)
				}
			} else {
				return createTimelineCards(story.entries)
			}
		}

		return (
			<div className='timeline'>
				{modal && currentModal === 'login' ? (
					<Modal>
						{' '}
						<LogInRegisterModal />{' '}
					</Modal>
				) : (
					''
				)}
				{modal && currentModal === 'storyedit' ? (
					<Modal>
						{' '}
						<StoryEdit />{' '}
					</Modal>
				) : (
					''
				)}

				<ButtonsForStory {...{ storyId, setCurrentModal }} />

				<StoryCard
					{...{
						story: story,
						specialStyle: {
							margin: '0px auto 50px auto',
							cursor: 'auto',
							opacity: 1,
							maxWidth: '200px',
						},
						inTimeline: true,
					}}
				/>

				{story.entries.length > 0 ? (
					<>
						<InspiringButton />
						<FilterNav filter={filter} setFilter={setFilter} />

						<div className='all-entries'>{viewableEntries()}</div>

						<div className='progress-container'>
							<div
								className='progress'
								style={{ width: `${currentProgress}%` }}
							/>
						</div>
					</>
				) : (
					<ErrorDisplay
						message={`Seems ${story.name} doesn't have any entries yet`}
					/>
				)}
			</div>
		)
	}
}

const createTimelineCards = entries => {
	let entryComponents = []

	if (entries.length > 0) {
		entries.forEach((entry, i) => {
			let position
			if (i === 0) {
				position = 'top'
			} // first entry
			else if (i === entries.length - 1) {
				position = 'bottom'
			} // last entry
			else {
				// middle entries
				if (i % 2 === 0) {
					position = 'left'
				} else {
					position = 'right'
				}
			}

			entryComponents.push(
				<TimelineCard
					{...{
						key: `entry_${entry.id}`,
						position: position,
						entry: entry,
					}}
				/>,
			)
		})
	} else {
	}

	return entryComponents
}

const mapStateToProps = (state, ownProps) => {
	return {
		current: state.page.current,
		user: state.profile.user,
		modal: state.page.modal,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getSingleStory: storyId => dispatch(getSingleStoryAction(storyId)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Story)
