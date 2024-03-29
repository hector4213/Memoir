import React from 'react'
import ListEntry from '../../../../2_components/ListEntry/ListEntry'
import './YourEntries.scss'
import { connect } from 'react-redux'

const YourEntries = props => {
	const { myEntries } = props

	let myEntryCards
	if (myEntries) {
		myEntryCards = myEntries.map(entry => {
			return (
				<ListEntry
					{...{
						key: entry.id,
						entry: entry,
					}}
				/>
			)
		})
	}

	return (
		<div className='entries'>
			<label> Your Entries: </label>

			<div className='listEntries'>{myEntryCards}</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		myEntries: state.profile.myEntries,
	}
}

export default connect(mapStateToProps)(YourEntries)
