import React from 'react';

function Tasks(props) {
  if(props.data) return (
    <ul className="tasksList">
      <li className="emptyCell"></li>
      {props.data.tasks.names.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
  else return <ul></ul>;
}

export default Tasks;
