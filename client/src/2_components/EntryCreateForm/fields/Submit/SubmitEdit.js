import React from 'react'
import Button from '../../../../3_templates/Button'

import { connect } from 'react-redux'

import { setErrorAction } from '../../../../redux/actions/page'
import { editEntryAction } from '../../../../redux/actions/entry'
import { deleteEntryAction } from '../../../../redux/actions/entry'
import { useNavigate } from 'react-router-dom'

import {
	areFieldsValid,
	parseForm,
	setFormToNotFilled,
	setDateToNotFilled,
} from './helpers'

const SubmitEdit = ({
	setFormInfo,
	formInfo,
	setDate,
	date,
	current,
	editEntry,
	setError,
	deleteEntry,
}) => {
	const navigate = useNavigate()

	return (
		<div className='submit-edit'>
			<Button
				{...{
					label: 'Delete Entry',
					transparent: true,
					red: true,
					extraClass: 'delete-entry',
					onClick: async e => {
						e.preventDefault()
						// eslint-disable-next-line no-restricted-globals
						if (confirm(`Are you sure you want to delete this entry?`)) {
							const deleted = await deleteEntry(current.entry)
							if (deleted) {
								navigate(`/story/${current.story.id}`)
							}
						}
					},
				}}
			/>

			<Button
				{...{
					label: 'Submit Edit',
					transparent: false,
					onClick: async e => {
						e.preventDefault()
						const allFieldsCompleted = areFieldsValid(formInfo, date)

						if (allFieldsCompleted) {
							let allFields = parseForm(formInfo, date)

							// add a tag if there is one in the text input
							const tagField = document.querySelector('.tagText').value

							if (tagField) {
								allFields = {
									...allFields,
									hashtags: [...formInfo.hashtags, { tagname: tagField }],
								}
							}

							const edited = await editEntry(allFields)
							setError(null)
							if (edited) {
								navigate(`/story/${current.story.id}/entry/${current.entry.id}`)
							}
						} else {
							setFormInfo(setFormToNotFilled(formInfo))
							setDate(setDateToNotFilled(date))
							setError(
								'Please check all fields to make sure they are filled out and longer than 3 characters',
							)
						}
					},
				}}
			/>
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
		setError: errorMessage => dispatch(setErrorAction(errorMessage)),
		editEntry: formInfo => dispatch(editEntryAction(formInfo)),
		deleteEntry: entry => dispatch(deleteEntryAction(entry)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitEdit)
