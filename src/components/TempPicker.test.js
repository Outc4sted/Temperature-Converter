import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import TempPicker from './TempPicker';

const props = {
  default: 'F',
  setTempScale: ()=>{}
};

describe('<TempPicker />', () => {
  it('renders without crashing', () => {
    shallow(<TempPicker {...props} />);
    mount(<TempPicker {...props} />)
  });
});
