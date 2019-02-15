import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import ResultTag from './ResultTag';

const props = {
  color: 'red',
  message: 'test'
};

describe('<ResultTag />', () => {
  it('renders without crashing', () => {
    shallow(<ResultTag {...props} />);
    mount(<ResultTag {...props} />)
  });
});
