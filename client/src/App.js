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
import Story from './controllers/Story/Story';
import Profile from './controllers/Profile/Profile'
import Entry from './controllers/Entry/Entry'
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
            <Story />
          </Route>

          {/* - - - - - - - - - - - - - - - - - - - - - - - */}


          <Route exact path="/story/:storyId/entry/:entryId">
            <Entry />
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