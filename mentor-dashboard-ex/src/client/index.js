import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    }
  }
  componentDidMount() {
    fetch('./school.json')
      .then(response => response.json())
      .then(data => this.setState({ data })
    );
  }
  render(){
    
    return <div>{JSON.stringify(this.state.data)}</div>
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
