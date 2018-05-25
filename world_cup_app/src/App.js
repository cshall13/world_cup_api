import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import BootstrapNavBar from './BootstrapNavBar';
import HomePage from './HomePage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={BootstrapNavBar} />
          <Route exact path="/" component={HomePage} />
        </div>
      </Router>
    );
  }
}

export default App;
