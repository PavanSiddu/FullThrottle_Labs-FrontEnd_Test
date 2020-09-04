import React, { Component } from 'react';
import Users from './components/Users';
import Header from './components/Header';
import './App.css'

class App extends Component { 
  render() {
    return (
      <div className='app'>
        <Header />
        <Users />
      </div>
    );
  }
}

export default App;
