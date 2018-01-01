import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Person = (props) => <div className="FamilyMember">{props.name}</div>

class PersonForm extends Component {
  constructor(props) {
    super()

    this.addMember = props.addMember
    this.state = { value: '' }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    this.props.addMember(this.state.value)
    this.setState({ value: '' })
    event.preventDefault()
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" vaule={this.state.value} onChange={this.handleChange} />
        </label>

        <input type="submit" value="Add Family Member" />
      </form>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      familyMembers: []
    }

    this.addMember = this.addMember.bind(this)
  }

  componentWillMount() {
    fetch('http://localhost:5000/members')
      .then(response => response.json())
      .then(members => this.setState({ familyMembers: members }))
  }

  addMember(name) {
    let data = { name: name }
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')

    fetch('http://localhost:5000/members', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: headers
    })
    .then(response => {
      if (response.ok) {
        let newMembers = [...this.state.familyMembers, {
          name: name,
          id: (new Date().getTime())
        }]

        this.setState({ familyMembers: newMembers })
      } else {
        alert('There was an error saving this member name')
      }
    })
  }

  render() {
    let familyMembers = this.state.familyMembers

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Family Members</h1>
        </header>

        <div className="FamilyList">
          {familyMembers.map(member =>
            <Person key={member.id} name={member.name} />
          )}
        </div>

        <PersonForm addMember={this.addMember}/>
      </div>
    );
  }
}

export default App;
