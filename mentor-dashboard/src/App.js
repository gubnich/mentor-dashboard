import React, { Component } from 'react';
import Select from 'react-select';
import './App.css';
import { fb } from './firebase';

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]

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
          {/* <ChooseMentor data={this.state.options}/> */}
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

// function ChooseMentor(props) {
//   console.log('props',props);
//   function handleChange(value){
//     console.log(value.value);
//   };
//   if(props.data) return (
//     <Select options={props.data} onChange={handleChange} />  
//   );
//   else return <input />
// }

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
  if(props.data && props.mentor) {
    const students = props.data.mentors[props.mentor].students;
    
    return (
      <ul className="Students-list">
        { Object.keys(students).map((item, i) => {
          return (
            <li className="student" key={i}>
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
