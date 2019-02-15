import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import TempDisplay from './TempDisplay';

const props = {
  title: 'Temperature',
  tempScale: 'F',
  tempValue: 32,
  setTemp: ()=>{}
};

describe('<TempDisplay />', () => {
  it('renders without crashing', () => {
    shallow(<TempDisplay {...props} />);
    mount(<TempDisplay {...props} />)
  });
});
