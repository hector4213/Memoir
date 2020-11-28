import React from 'react'
import './App.scss';
import Home from './controllers/Home/Home'
// import Timeline from './controllers/Timeline/Timeline';
import Profile from './controllers/Profile/Profile'

const App = () => {

  return (
    <div className="App">
      {/* <Home /> */}
      {/* <Timeline /> */}
      <Profile />
    </div>
  )
}

export default App;