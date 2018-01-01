import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Family Members</h1>
        </header>

        <div className="FamilyList">
          <div className="FamilyMember">Brandon</div>
          <div className="FamilyMember">Becky</div>
          <div className="FamilyMember">Violet</div>
          <div className="FamilyMember">Zoey</div>
        </div>

        <button>Add Family Member</button>
      </div>
    );
  }
}

export default App;
