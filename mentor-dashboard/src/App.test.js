import React from 'react';
import App from './App';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

it('checks rendering', () => {
  const app = mount(<App />);
  const elems = [
    '.app',
    '.entrance',
    '.btn',
    '.fileLinks',
  ]
  elems.forEach(item => {
    expect(app.find(item).exists()).toBe(true);
  })
});
