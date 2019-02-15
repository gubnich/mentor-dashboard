import React, { Component } from 'react';
import './App.css';
import { fb } from './firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    }
  }
  componentWillMount() {
    fetch('./school.json')
      .then(response => {
        return response.json()
      })
      .then(data => this.setState({ data })
    );
  }
  
  login() {
    fb.login().then(({ user }) => {
      //this.setState({ user });
      console.log(user)
    })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <input type="text" />
          <button onClick={this.login}>login</button>
        </header>
        <section className="App-body">
          <Tasks data={this.state.data} />
          <Students data={this.state.data} />
        </section>
      </div>
    );
  }
}

function Tasks(props) {
  if(props.data) return (
    <ul className="tasksList">
      <li className="emptyCell"></li>
      {props.data.tasks.names.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
  else return <ul></ul>;
}

function Students(props) {console.log(props);
  if(props.data) {
    const students = props.data.mentors['davojta'].students;
    
    return (
      <ul className="Students-list">
        { Object.keys(students).map((item, i) => {
          return (
            <li key={i}>
              <span className="Student-name">{item}</span>
              <ul>
                {students[item].score.map((ite, i) => {
                  if (ite) return <li key={i}>{ ite.mark }</li>
                  else return <li key={i}></li>
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    )
  }
  else return <ul></ul>;
}
export default App;
