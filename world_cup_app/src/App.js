import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import BootstrapNavBar from './BootstrapNavBar';
<<<<<<< HEAD
import HomePage from './HomePage';
=======
import Register from './register'
import Login from './login'
>>>>>>> login works, no handling on incorrect login info

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={BootstrapNavBar} />
<<<<<<< HEAD
          <Route exact path="/" component={HomePage} />
=======
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
>>>>>>> login works, no handling on incorrect login info
        </div>
      </Router>
    );
  }
}

export default App;
