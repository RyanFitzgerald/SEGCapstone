import React from 'react';
import Chart from 'chart.js';

class ChartsWrapper extends React.Component {
  constructor() {
    super();

    this.state = {
      chart: null
    }
  }

  componentDidMount() {
    const ctx = this.chartEle.getContext('2d');
    const chart = new Chart(ctx, {
      type: this.props.type,
      data: this.props.data,
      options: this.props.options
    });

    this.setState({ chart });
  }

  componentWillUnmount() {
    this.state.chart.destroy();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.state.chart.data) {
      const chart = this.state.chart;
      chart.data = nextProps.data;
      chart.update();
    }
  }

  render() {
    return (
      <canvas ref={input => this.chartEle = input}></canvas>
    );
  }
}

export default ChartsWrapper;