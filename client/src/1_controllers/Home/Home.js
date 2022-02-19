import React, { useEffect } from 'react'
import './Home.scss'

import { connect } from 'react-redux'

import Header from '../../2_components/Header/Header'
import Modal from '../../2_components/Modal/Modal'
import LogInRegisterModal from '../../2_components/LogInRegister/LogInRegister'

import { getAllStoriesAction } from '../../redux/actions/story'
import { clearCurrentAction } from '../../redux/actions/page'

import ButtonsForHome from '../../3_templates/Button/Groups/ForHome'
import HomeCards from './HomeCards'
import Searchbar from '../../2_components/Search/Search'

const Home = props => {
	const { getAllStories, clearCurrent } = props
	const { modal, stories } = props

	useEffect(() => {
		getAllStories()
		clearCurrent()
	}, [clearCurrent, getAllStories])

	return (
		<div className='home'>
			{modal ? (
				<Modal>
					<LogInRegisterModal />
				</Modal>
			) : (
				''
			)}
			<ButtonsForHome />
			<Header />
			<Searchbar />
			<HomeCards stories={stories} />
		</div>
	)
}

const mapStateToProps = state => {
	return {
		modal: state.page.modal,
		stories: state.page.stories,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getAllStories: () => dispatch(getAllStoriesAction()),
		clearCurrent: () => dispatch(clearCurrentAction()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
