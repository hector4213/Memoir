import React from 'react'
import './InspiringButton.scss'

import { connect } from 'react-redux'
import { addInspiringAction } from '../../../../redux/actions/inspiring'
import { setErrorAction } from '../../../../redux/actions/page'

import Button from '../../../Button'
import { HiOutlineLightningBolt } from 'react-icons/hi'

const InspiringButton = props => {
	const { story, user, addInspiring, setError } = props

	// CHECKING IF CLICKED BEFORE
	let clickedBefore
	if (story.inspiredBy && user) {
		clickedBefore = story.inspiredBy.find(
			i => i.id === user.id && i.inspiring === true,
		)
	}

	// ADDING THE CLASSES
	let classes = 'insp-btn '
	classes += clickedBefore ? 'clicked ' : ''
	classes += user ? '' : 'not-clickable '

	// ADDING THE COUNTER
	const inspiredCounter = story.inspiredBy.filter(i => i.inspiring)

	// CREATING THE LABEL
	let inspiredLabel
	if (inspiredCounter.length > 1) {
		inspiredLabel = `${inspiredCounter.length} people found this story inspiring`
	} else if (inspiredCounter.length === 1) {
		inspiredLabel = '1 person found this story inspiring'
	} else {
		inspiredLabel = 'Do you find this story inspiring ?'
	}

	const notLogged = e => {
		e.preventDefault()
		setError(
			'* Log In or Register to show people that you find this story inspiring.',
		)
	}

	return (
		<Button
			{...{
				label: inspiredLabel,
				onClick: user ? addInspiring : notLogged,
				transparent: true,
				icon: <HiOutlineLightningBolt />,
				extraClass: classes,
			}}
		/>
	)
}

const mapStateToProps = state => {
	return {
		story: state.page.current.story,
		user: state.profile.user,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addInspiring: () => dispatch(addInspiringAction()),
		setError: errorMessage => dispatch(setErrorAction(errorMessage)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InspiringButton)
