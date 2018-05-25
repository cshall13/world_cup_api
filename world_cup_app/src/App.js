import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import BootstrapNavBar from './BootstrapNavBar';
import HomePage from './HomePage';
import Register from './register'
import Login from './login'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={BootstrapNavBar} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
