import React, { Component } from 'react';
import { Card, Input } from 'antd';

class TempDisplay extends Component {
  render() {
    return (
      <Card className="tempDisplay" title={this.props.title} extra={'º' + this.props.tempScale}>
        <Input
          value={this.props.tempValue}
          size="large"
          onChange={this.props.setTemp}
        />
      </Card>
    );
  }
}

export default TempDisplay;
