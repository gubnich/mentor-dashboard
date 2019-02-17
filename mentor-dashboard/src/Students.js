import React from 'react';

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

export default Students;
