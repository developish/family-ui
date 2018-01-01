import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Person = (props) => <div className="FamilyMember">{props.name}</div>

class App extends Component {
  constructor() {
    super()
    this.state = {
      familyMembers: []
    }
  }

  componentWillMount() {
    fetch('http://localhost:5000/members')
      .then(response => response.json())
      .then(members => this.setState({ familyMembers: members }))
  }

  render() {
    let familyMembers = this.state.familyMembers

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Family Members</h1>
        </header>

        <div className="FamilyList">
          {familyMembers.map(name =>
            <Person key={name} name={name} />
          )}
        </div>

        <button>Add Family Member</button>
      </div>
    );
  }
}

export default App;
