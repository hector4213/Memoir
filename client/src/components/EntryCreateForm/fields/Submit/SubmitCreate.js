import React from 'react'
import Button from '../../../../templates/Button'

import { connect } from 'react-redux'

import { createEntryAction } from '../../../../redux/actions/entry'
import { setErrorAction } from '../../../../redux/actions/page'
import { useNavigate } from 'react-router-dom'

import {
	areFieldsValid,
	parseForm,
	setDateToNotFilled,
	setFormToNotFilled,
} from './helpers'

const SubmitCreate = ({
	setFormInfo,
	formInfo,
	setDate,
	date,
	createEntry,
	setError,
	current,
}) => {
	const navigate = useNavigate()

	return (
		<Button
			{...{
				label: 'Submit',
				transparent: false,
				extraClass: 'submit-createEntry',
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

						const created = await createEntry(allFields)
						if (created) {
							navigate(`/story/${current?.story?.id}/entry/${created}`)
						}

						setError(null)
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
	)
}

const mapStateToProps = state => {
	return {
		current: state.page.current,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createEntry: formInfo => dispatch(createEntryAction(formInfo)),
		setError: errorMessage => dispatch(setErrorAction(errorMessage)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitCreate)
