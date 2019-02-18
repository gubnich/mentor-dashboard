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
      <div className="app">
        <header className="appHeader">
          <Select options={this.state.options} 
                  onChange={this.handleChange}
                  // placeholder={''}
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
          <button onClick={this.login}>login</button>
        </header>
        <section className="appBody">
          <Tasks data={this.state.data} />
          <Students data={this.state.data} mentor={this.state.currentMentor}/>
        </section>
      </div>
    );
  }
}

export default App;
