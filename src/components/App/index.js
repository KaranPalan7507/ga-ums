import React, { Component } from 'react';
import './App.css';
import Intro from '../Intro';
import Users from './../../containers/Users';
import 'whatwg-fetch';


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Users Management System</h1>
        </header>
        <Intro message="List of users" />
        <Users />
      </div>
    );
  }
}

export default App;
