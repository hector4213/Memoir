import React from 'react'
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './controllers/Home/Home'
import Timeline from './controllers/Timeline/Timeline';
import Profile from './controllers/Profile/Profile'

const App = () => {

  return (
    <div className="App">
      <Router>
      <Switch>

          {/* - - - - - - - - - - - - - - - - - - - - - - - */}

          <Route exact path="/">
            <Home />
          </Route>

          {/* - - - - - - - - - - - - - - - - - - - - - - - */}


          <Route exact path="/timeline">
            <Timeline />
          </Route>

          {/* - - - - - - - - - - - - - - - - - - - - - - - */}

          <Route exact path="/profile">
            <Profile />
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

export default App;