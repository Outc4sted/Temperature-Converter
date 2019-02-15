import React, { Component } from 'react';
import { Card, Radio } from 'antd';

class TempPicker extends Component {
  render() {
    return (
      <Card className="tempPicker" size="small">
        <Radio.Group size="large" defaultValue={this.props.default} onChange={this.props.setTempScale}>
          <Radio.Button value="F"><strong>F</strong>arenheit</Radio.Button>
          <Radio.Button value="C"><strong>C</strong>elsius</Radio.Button>
          <Radio.Button value="K"><strong>K</strong>elvin</Radio.Button>
          <Radio.Button value="R"><strong>R</strong>ankine</Radio.Button>
        </Radio.Group>
      </Card>
    );
  }
}

export default TempPicker;
