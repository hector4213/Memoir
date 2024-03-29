import React, { useEffect } from 'react'
import './EntryEdit.scss'

import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getSingleEntryAction } from '../../../redux/actions/entry'
import EntryCreateForm from '../../../2_components/EntryCreateForm/EntryCreateForm'
import GoHomeButton from '../../../3_templates/Button/Types/GoHome'
import GoToEntryButton from '../../../3_templates/Button/Types/GoToEntry'

const EntryEdit = props => {
	const { getSingleEntry, current } = props
	const { storyId, entryId } = useParams()

	useEffect(() => {
		getSingleEntry(storyId, entryId)
	}, [getSingleEntry, storyId, entryId])

	if (!current || !current.entry) {
		return <div></div>
	}

	return (
		<div className='entry-edit'>
			<GoHomeButton />
			<GoToEntryButton />
			<EntryCreateForm edit={true} entry={current.entry} />
		</div>
	)
}

const mapStateToProps = state => {
	return {
		current: state.page.current,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getSingleEntry: (storyId, entryId) =>
			dispatch(getSingleEntryAction(storyId, entryId)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(EntryEdit)
