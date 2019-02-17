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
              <a href={students[item].gitHubLink} className="studentName">{item}</a>
              <ul className="studentMarks">
                {students[item].score.map((item, i) => {
                  let mark = item ? item.mark : null;
                  let link =  item ? item.linkPR : null;
                  let comment =  item ? item.comment : null;
                  return <Mark mark={mark} status={statuses[i]} key={i} link={link} comment={comment} />
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
