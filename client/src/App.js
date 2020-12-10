import React, {useEffect} from 'react'
import './App.scss';
import {connect} from 'react-redux'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect
} from "react-router-dom";

import Home from './controllers/Home/Home'
import Story from './controllers/Story/Story';
import Profile from './controllers/Profile/Profile'
import Entry from './controllers/Entry/Entry'
import FourZeroFour from './controllers/FourZeroFour/FourZeroFour'

import {storedProfileAction} from './redux/actions/profile'
import {setErrorAction} from './redux/actions/page'
import EntryCreate from './controllers/EntryCreate/EntryCreate';
import EntryEdit from './controllers/EntryEdit/EntryEdit'

const App = props => {
  const {storedProfile, setError, error} = props

  useEffect(()=>{
      storedProfile()
  }, [storedProfile])

  return (
    <div className="App">

      {error? <div className='error-message' onClick={() => setError(null)}> {error} </div> : ''}

      <Router>
      <Switch>

          {/* - - - - - - - - - - - - - - - - - - - - - - - */}

          <Route exact path="/">
            <Home />
          </Route>

          {/* - - - - - - - - - - - - - - - - - - - - - - - */}


          <Route exact path="/story/:storyId">
            <Story />
          </Route>

          {/* - - - - - - - - - - - - - - - - - - - - - - - */}


          <Route exact path="/story/:storyId/entry/:entryId">
            <Entry />
          </Route>

          {/* - - - - - - - - - - - - - - - - - - - - - - - */}

          <Route exact path="/profile">
            <Profile />
          </Route>

          {/* - - - - - - - - - - - - - - - - - - - - - - - */}

          <Route exact path="/story/:storyId/addEntry">
          <EntryCreate />
          </Route>

          {/* - - - - - - - - - - - - - - - - - - - - - - - */}

          <Route exact path="/story/:storyId/entry/:entryId/editEntry">
          <EntryEdit />
          </Route>

          {/* - - - - - - - - - - - - - - - - - - - - - - - */}


          <Route component={FourZeroFour} />

          {/* - - - - - - - - - - - - - - - - - - - - - - - */}

        </Switch>
        </Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    error: state.page.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storedProfile: () => dispatch(storedProfileAction()),
    setError: (message) => dispatch(setErrorAction(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)