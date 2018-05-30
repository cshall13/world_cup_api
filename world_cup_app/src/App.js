import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import BootstrapNavBar from './BootstrapNavBar';
import HomePage from './HomePage';
import Register from './register';
import Login from './login';
import GroupPage from './GroupPage';
import Schedule from './Schedule';
import Team from './team';
import TeamSearch from './TeamSearch';
import Calendar from './Calendar';

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
          <Route path="/search/:searchTerm" component={TeamSearch} />
          <Route path="/team/:teamId" component={Team} />
          <Route path="/calendar" component={Calendar} />
        </div>
      </Router>
    );
  }
}

export default App;
