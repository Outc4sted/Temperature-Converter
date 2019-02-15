import React, { Component } from 'react';
import { Button, Card, Input } from 'antd';
import TempPicker from './components/TempPicker';
import TempDisplay from './components/TempDisplay';
import ResultTag from './components/ResultTag';
import './App.css';

const conversions = [
  {
    type: 'FtoC',
    convert: t => (t - 32) * 5/9,
  },
  {
    type: 'CtoK',
    convert: t => t + 273.15,
  },
  {
    type: 'KtoR',
    convert: t => t * 9/5,
  },
  {
    type: 'RtoF',
    convert: t => t - 459.67,
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempQuery: null,
      studentAnswer: null,
      tempResult: null,
      tempScaleSource: 'F',
      tempScaleTarget: 'C',
      response: 'Result'
    };
  }

  setTempQuery = ({target:{ value }}) => this.setState({tempQuery: value })
  setStudentAnswer = ({target:{ value }}) => this.setState({studentAnswer: value })
  setTempScaleSource = ({target:{ value }}) => this.setState({tempScaleSource: value })
  setTempScaleTarget = ({target:{ value }}) => this.setState({tempScaleTarget: value })

  clearForm = () => {
    this.setState({
      tempQuery: null,
      studentAnswer: null,
      tempResult: null,
      response: 'Result'
    });
  }

  round = (value, decimals=0) => {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }

  convertTemperature = (temperature, tempScaleSource, tempScaleTarget) => {
    if (tempScaleSource !== tempScaleTarget) {
      let index = conversions.findIndex(c => Object.getOwnPropertyNames(c).find(k => k === 'type' && c[k][0] === tempScaleSource));
      const endingConvIndex = conversions.findIndex(c => Object.getOwnPropertyNames(c).find(k => k === 'type' && c[k][k.length-1] === tempScaleTarget));

      do {
        index = index === conversions.length ? 0 : index
        temperature = conversions[index].convert(temperature);
      }
      while(endingConvIndex !== index++)
    }

    return this.round(temperature);
  }

  calculateResult = () => {
    const { tempScaleSource, tempScaleTarget, tempQuery, studentAnswer } = this.state;
    const validForm = tempQuery && studentAnswer && !isNaN(studentAnswer) && !isNaN(tempQuery);

    let actualResult;
    if (tempQuery && !isNaN(tempQuery)) {
      actualResult = this.convertTemperature(tempQuery, tempScaleSource, tempScaleTarget);
      this.setState({tempResult: actualResult });
    }

    if (validForm) {
      const studentResult = this.round(studentAnswer);
      this.setState({response: actualResult === studentResult ? <ResultTag color="green" message="Correct" /> : <ResultTag color="volcano" message="Incorrect" />});
    }
    else this.setState({response: <ResultTag color="magenta" message="Invalid" />});
  }

  render() {
    const { tempScaleSource, tempScaleTarget, tempResult, response, tempQuery, studentAnswer } = this.state;

    return (
      <div id="app">
        <h1>Temperature Converter</h1>

        <div id="tempScaleGroup">
          <TempPicker id="tempScaleSource" default="F" setTempScale={this.setTempScaleSource}/>
          <h2><strong>º{tempScaleSource}</strong> Converted to <strong>º{tempScaleTarget}</strong></h2>
          <TempPicker id="tempScaleTarget" default="C" setTempScale={this.setTempScaleTarget}/>
        </div>

        <div id="tempDisplayGroup">
          <TempDisplay id="tempQuery" title="Input Temperature" tempValue={tempQuery} setTemp={this.setTempQuery} tempScale={tempScaleSource} />
          <TempDisplay id="studentAnswer" title="Student's Answer" tempValue={studentAnswer} setTemp={this.setStudentAnswer} tempScale={tempScaleTarget} />

          <div id="actionGroup">
            <Button id="checkAnswerBtn" className="actionBtn" icon="check" type="primary" size="large" onClick={this.calculateResult}>
              <strong>&nbsp;Check Answer</strong>
              <h6><i>(Rounded to the ones place)</i></h6>
            </Button>
            <Button id="clearFormBtn" className="actionBtn" icon="reload" type="danger" onClick={this.clearForm}>
              <strong>&nbsp;Clear</strong>
            </Button>
          </div>

          <Card className="tempDisplay" title={response} extra={'º' + tempScaleTarget}>
            <Input
              value={tempResult}
              size="large"
              readOnly={true}
            />
          </Card>
        </div>

      </div>
    );
  }
}

export default App;
