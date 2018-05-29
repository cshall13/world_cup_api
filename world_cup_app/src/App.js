import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import BootstrapNavBar from './BootstrapNavBar';
import HomePage from './HomePage';
import Register from './register';
import Login from './login';
import GroupPage from './GroupPage';
import Schedule from './Schedule';
import Team from './team';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={BootstrapNavBar} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route path="/groups" component={GroupPage} />
          <Route path="/schedule" component={Schedule} />
          <Route exact path="/team/:teamId" component={Team} />
        </div>
      </Router>
    );
  }
}

export default App;
