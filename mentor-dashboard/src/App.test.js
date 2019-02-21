import React from 'react';
import App from './App';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

it('checks the components rendering', () => {
  const mock = {
    "tasks": {
     "names": ["testTaskName"],
     "links": ["testTaskLink"],
     "statuses": ["testTaskStatus"]
    },
    "mentors": {
     "testMentor": {
      "name": "testMentorName",
      "login": "testMentor",
      "city": "testCity",
      "students": {
       "testStudent": {
        "score": [
         {
          "linkPR": "testLink",
          "mark": "testMark"
         },
        
        ],
        "gitHubLink": "testGitHubLink"
       }
      }
    }
  }
}
  const wrapper = mount(<App />);
  wrapper.setState({ data: mock, currentMentor: 'testMentor'});
  const elems = [
    '.app',
    '.appHeader',
    '.appBody',
    '.tasksList',
    '.studentsList'
  ]
  elems.forEach(item => {
    expect(wrapper.find(item).exists()).toBe(true);
  })
});
