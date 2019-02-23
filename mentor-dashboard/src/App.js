import React, { Component } from 'react';
import Select from 'react-select';
import './App.css';
import './vendor/button.css';
import { fb } from './firebase';
import Tasks from './components/Tasks';
import Students from './components/Students';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      user: '',
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
        console.log('data', data);
        const option = Object.keys(data.mentors).map(item => {
          return {value: item, label: item};
        })
        this.setState({ data: data , options: option})
      }
    );
  }
  
  login() {
    fb.login().then(({ user }) => {
      fetch(`https://api.github.com/user/${user.providerData[0].uid}`)
        .then(response => {
          return response.json();
        })
        .then(response => {
          const user = response.login.toLowerCase();
          sessionStorage.setItem('session', user);
          if (this.state.data.mentors[user]) {
            localStorage.setItem('mentorLogin', user);
            this.setState({ user : user, currentMentor: localStorage.mentorLogin });
          } else {
            this.setState({ user : user, currentMentor: undefined });
          }
          
          console.log(response);
        })
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
  generateValue() {
    const option = {
      value: this.state.currentMentor,
      label: this.state.currentMentor
    };
    return option;
  }
  render() {console.log(this.state.currentMentor, this.state.user);
    if (sessionStorage.session) {
      return (
      <div className="app">
        <header className="appHeader">
          <Select options={this.state.options} 
                  onChange={this.handleChange}
                  defaultValue={this.setDefaultMentor()}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                    ...theme.colors,
                    primary50: '#B9C1D4',
                    primary: '#6477A0',
                    neutral0: '#ECEEF3'
                    },
                  })}
                  />
        </header>
        <section className="appBody">
          <Tasks data={this.state.data} />
          <Students data={this.state.data} mentor={this.state.currentMentor}/>
        </section>
      </div>)
    } else {
      return (
      <div className="app">
        <div className="entrance">
          <div className="btn" onClick={this.login}><span>Login</span></div>
          <ul className="fileLinks">
            <li>
              <a href="https://docs.google.com/spreadsheets/d/1-HYzpnEYpIsv5qSSuSZCgKf5-mYnG0T3Xt864Hhdnew/edit?usp=drive_open&ouid=0">Pairs</a>
            </li>
            <li>
              <a href="https://docs.google.com/spreadsheets/d/1uojrkWfoLh9oTKxLWCdirrNJYGVfCtiF9RlZrwsxSbo/edit#gid=0">Tasks</a>
            </li>
            <li>
              <a href="https://docs.google.com/spreadsheets/d/18exMEOWGKsMPggt0t3yU-MR1gvX3OFBDqKCvdNy8rAU/edit#gid=104739544">Scores</a>
            </li>
          </ul>
        </div>
      </div>);
    }
  }
}

export default App;
