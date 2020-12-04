import React from 'react'
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

const App = props => {
  const {user} = props

  const getBackEnd = async () => {
    // const res = await axios.get('http://localhost:3001/api/users')
    // console.log('users:')
    // console.log(res)
  }

  getBackEnd()

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


          <Route path="/">
            <Home />
          </Route>

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

export default connect(mapStateToProps)(App)