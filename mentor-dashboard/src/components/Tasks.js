import React from 'react';

function Tasks(props) {
  if(props.data) {
    const tasks = props.data.tasks;
    return (
      <ul className="tasksList">
        <li className="emptyCell"></li>
        {tasks.names.map((item, i) => {
          const link = tasks.links[i] ? tasks.links[i] : null;
          return <li key={i}><a data-type={link ? "yes" : "no"} href={tasks.links[i]}>{item}</a></li>
        })}
        
      </ul>
    );
  } else {
    return <ul></ul>;
  }
}

export default Tasks;
