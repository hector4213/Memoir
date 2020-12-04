import React, {useEffect} from 'react'
import './App.scss';
import {connect} from 'react-redux'

// import axios from 'axios'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Home from './controllers/Home/Home'
import Timeline from './controllers/Timeline/Timeline';
import Profile from './controllers/Profile/Profile'
import SingleEntry from './controllers/SingleEntry/SingleEntry'
import FourZeroFour from './controllers/FourZeroFour/FourZeroFour'

import {storedProfileAction} from './redux/actions/profile'

const App = props => {
  const {user} = props
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
            <Timeline />
          </Route>

          {/* - - - - - - - - - - - - - - - - - - - - - - - */}


          <Route exact path="/story/:storyId/entry/:entryId">
            <SingleEntry />
          </Route>

          {/* - - - - - - - - - - - - - - - - - - - - - - - */}

          <Route exact path="/profile">
          {user ?  <Profile />: <Redirect to="/" />}
          </Route>

          {/* - - - - - - - - - - - - - - - - - - - - - - - */}


          <Route component={FourZeroFour} />

          {/* - - - - - - - - - - - - - - - - - - - - - - - */}

        </Switch>
        </Router>
    </div>
  )
}

const mapStateToProps = state =>{
  return {
    user: state.profile.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storedProfile: () => dispatch(storedProfileAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)