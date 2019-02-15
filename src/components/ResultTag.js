import React, { Component } from 'react';
import { Tag } from 'antd';

class ResultTag extends Component {
  render() {
    return (
      <div>Result&nbsp;<Tag color={this.props.color}><strong>{this.props.message}</strong></Tag></div>
    );
  }
}

export default ResultTag;
