import React from 'react'
import './ListEntry.scss'
// import { useHistory } from 'react-router-dom'

import { HiOutlineXCircle, HiThumbUp, HiThumbDown } from 'react-icons/hi'
import { connect } from 'react-redux'
import { deleteEntryAction } from '../../redux/actions/entry'
import { editForeignEntriesAction } from '../../redux/actions/foreignEntries'
import ListEntryTemplate from '../../3_templates/ListEntryTemplate/ListEntryTemplate'

const ListEntry = props => {
	const { entry, foreign } = props
	const { deleteEntry, editForeignEntries } = props

	// redirects
	// const history = useHistory()
	// const goToEntry = useCallback(
	// 	() => history.push(`/story/${entry.story_id}/entry/${entry.id}`),
	// 	[history, entry],
	// )
	// const goToStory = useCallback(
	// 	() => history.push(`/story/${entry.story_id}`),
	// 	[history, entry],
	// )

	const thumbUpClass = entry.entry_status === 1 ? 'active' : ''
	const thumbDownClass = entry.entry_status === 3 ? 'active' : ''

	return (
		<div>
			<ListEntryTemplate {...{ entry }}>
				{/* <ListEntryTemplate {...{ entry, goToEntry, goToStory }}> */}
				{foreign ? (
					<>
						<HiThumbUp
							className={`thumbs thumb-up-btn ${thumbUpClass}`}
							onClick={e => {
								e.preventDefault()
								e.stopPropagation()
								if (entry.entry_status === 1) {
									editForeignEntries(entry.id, 2)
								} else {
									editForeignEntries(entry.id, 1)
								}
							}}
						/>

						<HiThumbDown
							className={`thumbs thumb-down-btn ${thumbDownClass}`}
							onClick={e => {
								e.preventDefault()
								e.stopPropagation()
								if (entry.entry_status === 3) {
									editForeignEntries(entry.id, 2)
								} else {
									editForeignEntries(entry.id, 3)
								}
							}}
						/>
					</>
				) : (
					<HiOutlineXCircle
						className={'delete-btn'}
						onClick={e => {
							e.preventDefault()
							e.stopPropagation()
							if (
								// eslint-disable-next-line no-restricted-globals
								confirm(`Are you sure you want to delete '${entry.title}' ?`)
							) {
								if (deleteEntry) {
									deleteEntry(entry)
								}
							}
						}}
					/>
				)}
			</ListEntryTemplate>
		</div>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		deleteEntry: entry => dispatch(deleteEntryAction(entry)),
		editForeignEntries: (entryId, entryStatus) =>
			dispatch(editForeignEntriesAction(entryId, entryStatus)),
	}
}

export default connect(null, mapDispatchToProps)(ListEntry)
