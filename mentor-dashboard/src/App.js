import React, { Component } from 'react';
import Select from 'react-select';
import './App.css';
import { fb } from './firebase';
import Tasks from './Tasks';
import Students from './Students';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      data: null,
      options: [],
      currentMentor: '',
    }
  }
  componentDidMount() {
    fetch('./school.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log('data', Object.keys(data.mentors));
        const option = Object.keys(data.mentors).map(item => {
          return {value: item, label: item};
        })
        this.setState({ data: data , options: option})
      }
    );
  }
  
  login() {
    fb.login().then(({ user }) => {
      //this.setState({ user });
      console.log(user)
    })
  }
  handleChange(value){
    console.log(value.value);
    this.setState({ currentMentor : value.value });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Select options={this.state.options} onChange={this.handleChange} />
          <button onClick={this.login}>login</button>
        </header>
        <section className="App-body">
          <Tasks data={this.state.data} />
          <Students data={this.state.data} mentor={this.state.currentMentor}/>
        </section>
      </div>
    );
  }
}

export default App;
