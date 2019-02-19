import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import App from './App';

let wrap;
const initialState = {
  tempQuery: null,
  studentAnswer: null,
  tempResult: null,
  tempScaleSource: 'F',
  tempScaleTarget: 'C',
  response: 'Result'
};

describe('<App />', () => {
  it('renders without crashing', () => {
    shallow(<App />);
    mount(<App />)
  });

  describe('App class methods', () => {
    beforeEach(() => {
      wrap = shallow(<App />);
      wrap.setState(initialState);
    });

    describe('App.setTempQuery(Event)', () => {
      it('sets TempQuery on App state', () => {
        wrap.setState({setTempQuery: 13});

        const changeEvent = {target: {value: 42}};
        wrap.instance().setTempQuery(changeEvent);

        expect(wrap.state('tempQuery')).toEqual(42);
      });
    });

    describe('App.setStudentAnswer(Event)', () => {
      it('sets StudentAnswer on App state', () => {
        wrap.setState({setStudentAnswer: 13});

        const changeEvent = {target: {value: 42}};
        wrap.instance().setStudentAnswer(changeEvent);

        expect(wrap.state('studentAnswer')).toEqual(42);
      });
    });

    describe('App.setTempScaleSource(Event)', () => {
      it('sets TempScaleSource on App state', () => {
        wrap.setState({setTempScaleSource: 13});

        const changeEvent = {target: {value: 42}};
        wrap.instance().setTempScaleSource(changeEvent);

        expect(wrap.state('tempScaleSource')).toEqual(42);
      });
    });

    describe('App.setTempScaleTarget(Event)', () => {
      it('sets TempScaleTarget on App state', () => {
        wrap.setState({setTempScaleTarget: 13});

        const changeEvent = {target: {value: 42}};
        wrap.instance().setTempScaleTarget(changeEvent);

        expect(wrap.state('tempScaleTarget')).toEqual(42);
      });
    });

    describe('App.clearForm()', () => {
      it('resets app form', () => {
        wrap.setState({
          tempQuery: -40,
          studentAnswer: -40,
          tempResult: -40,
          response: 'Correct'
        });

        wrap.instance().clearForm();

        expect(wrap.state('tempQuery')).toEqual(null);
        expect(wrap.state('studentAnswer')).toEqual(null);
        expect(wrap.state('tempResult')).toEqual(null);
        expect(wrap.state('response')).toEqual('Result');
      });
    });

    describe('App.round(value, decimals=0)', () => {
      it('rounds to nearest integer if not provided a second param', () => {
        const result = wrap.instance().round(1.333);

        const precision = result.toString().indexOf('.')
        expect(precision).toEqual(-1);
        expect(result).toEqual(1);
      });

      it('rounds down to the tenths decimal place', () => {
        const result = wrap.instance().round(1.333, 1);

        const precision = result.toString().length - result.toString().indexOf('.') - 1;
        expect(precision).toEqual(1);
        expect(result).toEqual(1.3);
      });

      it('rounds up to the tenths decimal place', () => {
        const result = wrap.instance().round(1.55, 1);

        const precision = result.toString().length - result.toString().indexOf('.') - 1;
        expect(precision).toEqual(1);
        expect(result).toEqual(1.6);
      });

      it('rounds to the millionths decimal place', () => {
        const result = wrap.instance().round(1.2228735, 6);

        const precision = result.toString().length - result.toString().indexOf('.') - 1;
        expect(precision).toEqual(6);
        expect(result).toEqual(1.222874);
      });
    });

    describe('App.convertTemperature(temperature, tempScaleSource, tempScaleTarget)', () => {
      it('should return the rounded initial temperature if both scales are the same', () => {
        const result = wrap.instance().convertTemperature(42.1, 'F', 'F');
        expect(result).toEqual(42);
      });

      it('should convert from Fahrenheit to Celsius with a string', () => {
        const result = wrap.instance().convertTemperature('100', 'C', 'F');
        expect(result).toEqual(212);
        console.log('ok');
      });

      it('should convert from Fahrenheit to Celsius', () => {
        const result = wrap.instance().convertTemperature(32, 'F', 'C');
        expect(result).toEqual(0);
      });

      it('should convert from Celsius to Kelvin', () => {
        const result = wrap.instance().convertTemperature(100, 'C', 'K');
        expect(result).toEqual(373);
      });

      it('should convert from Kelvin to Rankine', () => {
        const result = wrap.instance().convertTemperature(300, 'K', 'R');
        expect(result).toEqual(540);
      });

      it('should convert from Rankine to Fahrenheit', () => {
        const result = wrap.instance().convertTemperature(451.7, 'R', 'F');
        expect(result).toEqual(-8);
      });

      it('should cycle conversions to convert from Celsius to Fahrenheit', () => {
        const result = wrap.instance().convertTemperature(0, 'C', 'F');
        expect(result).toEqual(32);
      });
    });

    describe('App.calculateResult()', () => {
      it('should calculate a result with valid input temperature', () => {
        wrap.setState({
          tempQuery: 32,
          tempScaleSource: 'F',
          tempScaleTarget: 'C'
        });

        wrap.instance().calculateResult();
        expect(wrap.state('tempResult')).toEqual(0);
      });

      it('should display a Correct response for a valid student answer', () => {
        wrap.setState({
          tempQuery: 40,
          studentAnswer: 4.444,
          tempScaleSource: 'F',
          tempScaleTarget: 'C'
        });

        wrap.instance().calculateResult();

        const resultTag = mount(wrap.state('response'));
        expect(resultTag.find('strong').text()).toEqual('Correct');
      });

      it('should display an Incorrect response for a wrong student answer', () => {
        wrap.setState({
          tempQuery: 40,
          studentAnswer: 5,
          tempScaleSource: 'F',
          tempScaleTarget: 'C'
        });

        wrap.instance().calculateResult();

        const resultTag = mount(wrap.state('response'));
        expect(resultTag.find('strong').text()).toEqual('Incorrect');
      });

      it('should display an Invalid response for an invalid input temperature', () => {
        wrap.setState({
          tempQuery: 'GG',
          studentAnswer: 5,
          tempScaleSource: 'F',
          tempScaleTarget: 'C'
        });

        wrap.instance().calculateResult();

        const resultTag = mount(wrap.state('response'));
        expect(resultTag.find('strong').text()).toEqual('Invalid');
      });

      it('should display an Invalid response for an invalid student answer', () => {
        wrap.setState({
          tempQuery: 32,
          studentAnswer: 'QQ',
          tempScaleSource: 'F',
          tempScaleTarget: 'C'
        });

        wrap.instance().calculateResult();

        const resultTag = mount(wrap.state('response'));
        expect(resultTag.find('strong').text()).toEqual('Invalid');
      });
    });
  });
});
