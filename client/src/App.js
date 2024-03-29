import { useEffect } from 'react'
import './App.scss'
import { connect } from 'react-redux'

import { Routes, Route } from 'react-router-dom'

import Home from './1_controllers/Home/Home'
import Story from './1_controllers/Story'
import Profile from './1_controllers/Profile'
import FourZeroFour from './1_controllers/404'

import { storedProfileAction } from './redux/actions/profile'
import { setErrorAction } from './redux/actions/page'

import Entry from './1_controllers/Entry'
import EntryCreate from './1_controllers/Entry/Create'
import EntryEdit from './1_controllers/Entry/Edit'

// console.log(process.env.REACT_APP_production)

const App = ({ storedProfile, setError, error }) => {
	useEffect(() => {
		storedProfile()
	}, [storedProfile])

	return (
		<div className='App'>
			{error && error.startsWith('*') && (
				<div className='success-message' onClick={() => setError(null)}>
					{error}
				</div>
			)}

			{error && !error.startsWith('*') && (
				<div className='error-message' onClick={() => setError(null)}>
					{error}
				</div>
			)}

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/story/:storyId' element={<Story />} />
				<Route path='/story/:storyId/entry/:entryId' element={<Entry />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/story/:storyId/addEntry' element={<EntryCreate />} />
				<Route
					path='/story/:storyId/entry/:entryId/editEntry'
					element={<EntryEdit />}
				/>
				<Route element={<FourZeroFour />} />
			</Routes>
		</div>
	)
}

const mapStateToProps = state => ({
	error: state.page.error,
})

const mapDispatchToProps = dispatch => ({
	storedProfile: () => dispatch(storedProfileAction()),
	setError: message => dispatch(setErrorAction(message)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
