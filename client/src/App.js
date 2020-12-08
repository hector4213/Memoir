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
import EntryCreate from './controllers/EntryCreate/EntryCreate';
import EntryEdit from './controllers/EntryEdit/EntryEdit'

const App = props => {
  const {storedProfile} = props

  useEffect(()=>{
      storedProfile()
  }, [storedProfile])

  return (
    <div className="App">
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

const mapDispatchToProps = dispatch => {
  return {
    storedProfile: () => dispatch(storedProfileAction())
  }
}

export default connect(null, mapDispatchToProps)(App)