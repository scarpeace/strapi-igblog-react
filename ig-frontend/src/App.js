import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css';
import Home from './pages/Home'
import Create from './pages/Create'
import Nav from './components/Nav'
import SinglePost from './pages/SinglePost'

export default function App() {
  return (
    <div className="App">
      <h2>Quick Start Project</h2>

  {    <BrowserRouter>
      <Nav/>
        <Switch>
          <Route path='/' exact  component={Home} />
          <Route path='/create' component={Create} />
          <Route path='/:id' component={SinglePost} />
        </Switch>
      </BrowserRouter>}
    </div>
  )

}

