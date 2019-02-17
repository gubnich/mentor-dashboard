import React, { Component } from 'react';
import Select from 'react-select';
import './App.css';
import { fb } from './firebase';
import Tasks from './components/Tasks';
import Students from './components/Students';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      data: null,
      options: [],
      currentMentor: localStorage.mentorLogin,
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
    localStorage.setItem('mentorLogin', value.value);
    this.setState({ currentMentor : value.value });
  }
  setDefaultMentor() {
    const option = {
      value: this.state.currentMentor,
      label: this.state.currentMentor
    };
    return this.state.currentMentor ? option : undefined;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Select options={this.state.options} 
                  onChange={this.handleChange}
                  // placeholder={''}
                  defaultValue={this.setDefaultMentor()}
                   />
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
