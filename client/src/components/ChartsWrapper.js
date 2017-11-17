import React from 'react';
import Chart from 'chart.js';
//import '../../node_modules/pikaday/css/pikaday.css';

class ChartsWrapper extends React.Component {
  componentDidMount() {
    const ctx = this.chart.getContext('2d');
    this.statsChart = new Chart(ctx, {
      type: this.props.type,
      data: this.props.data,
      options: this.props.options
    });
  }

  componentWillUnmount() {
    this.statsChart.destroy();
  }

  render() {
    return (
      <canvas ref={input => this.chart = input}></canvas>
    );
  }
}

export default ChartsWrapper;