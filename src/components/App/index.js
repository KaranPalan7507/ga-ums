import React, { Component } from 'react';
import './App.css';
import UserListing from './../UserListing';
import 'whatwg-fetch';


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Users Management System</h1>
        </header>
        <UserListing />
      </div>
    );
  }
}

export default App;
