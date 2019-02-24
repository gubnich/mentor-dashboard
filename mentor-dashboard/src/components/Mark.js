import React from 'react';

function Mark(props) {
  let className;
  switch (true) {
    case (props.status === 'In Progress'): className = 'statusInProgress'; break;
    case (props.mark !== null): className = 'statusDone'; break;
    case (props.status === 'Checked'): className = 'statusChecked'; break;
    case (props.status === 'Checking'): className = 'statusChecking'; break;
    default: className = 'statusToDo'; break;
  }
  return (
    <li className={className}>
      <a href={props.link} title={props.comment}>{ props.mark }</a>
    </li>
  )
}

export default Mark;
