import React from 'react';
import Mark from './Mark';

function Students(props) {
  if(props.data && props.mentor) {console.log(props.data.tasks.statuses);
    const students = props.data.mentors[props.mentor].students;
    const statuses = props.data.tasks.statuses;

    return (
      <ul className="studentsList">
        { Object.keys(students).map((item, i) => {
          return (
            <li className="student" key={i}>
              <span className="studentName">{item}</span>
              <ul className="studentMarks">
                {students[item].score.map((item, i) => {
                  let mark = item ? item.mark : null; 
                  return <Mark mark={mark} status={statuses[i]} key={i} />
                  // else return <li key={i}></li>
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
