import React from 'react';
import moment from 'moment';
import * as api from '../../api';

import Loading from '../Loading';
import ChartsWrapper from '../ChartsWrapper';

class Total extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleFilter = this.handleFilter.bind(this);
    this.getTotalVolume = this.getTotalVolume.bind(this);
    this.prepareData = this.prepareData.bind(this);
    this.getDollars = this.getDollars.bind(this);

    // Set state
    this.state = {
      volume: null
    }
  }

  componentDidMount() {
    // Set title
    document.title = 'Total Sales Volume | Renovaction';

    // Update active tab
    this.props.setActiveSubtab(1);

    // Get Total Volume
    this.getTotalVolume();
  }

  getTotalVolume() {
    const query = {
      access_token: JSON.parse(sessionStorage.getItem('user')).access_token
    };

    api.getTotalVolume(query).then(result => {
      this.setState({volume: result});
    });
  }

  prepareData(volume) {
    const dataPoints = [];
    const dataLabels = [];
    let totalVolume = 0;
    
    volume.forEach(ele => {
      totalVolume = totalVolume + ele.contractCost;
      dataPoints.push((totalVolume).toFixed(2));
      dataLabels.push(moment(ele.soldDate).format('MMMM DD, YYYY'));
    });

    return {dataPoints, dataLabels, totalVolume};
  }

  getDollars(cents) {
    const dollars = (cents/100).toFixed(2);
    let dollarString = dollars.toString().split('.');

    if (dollarString[0].length >= 4) {
      dollarString[0] = dollarString[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }

    return dollarString.join('.');
  }

  handleFilter() {

  }

  render() {
    if (!this.state.volume) {
      return(
        <Loading/>
      );
    }
    
    // Get prepared data
    const preparedData = this.prepareData(this.state.volume);

    const data = {
      labels: preparedData.dataLabels,
      datasets: [{
        label: 'Sales Volume',
        data: preparedData.dataPoints,
        backgroundColor: [
          'rgba(54, 162, 235, 0.4)'
        ],
        borderColor: [
          'rgba(54, 100, 235, 1)'
        ],
        borderWidth: 1
      }]
    };

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    };

    return (
      <div className="content">
        <div className="row">
          <div className="column">
            <h2 className="card-title">Filter Data</h2>
            <div className="card">
              <div className="row">
                <div className="sm-4 column">
                  <label className="form-label" htmlFor="month">Month</label>
                  <span className="form-select">
                    <select ref={input => this.month = input} id="month" name="month" onChange={this.handleFilter}>
                      <option value="">All</option>
                      <option value="january">January</option>
                      <option value="february">February</option>
                      <option value="march">March</option>
                    </select>
                  </span>
                </div>
                <div className="sm-4 column">
                  <label className="form-label" htmlFor="year">Year</label>
                  <span className="form-select">
                    <select ref={input => this.month = input} id="year" name="year" onChange={this.handleFilter}>
                      <option value="">All</option>
                      <option value="2017">2017</option>
                      <option value="2016">2016</option>
                      <option value="2015">2015</option>
                    </select>
                  </span>
                </div>
                <div className="sm-4 column">
                  <label className="form-label" htmlFor="postalCode">Postal Code</label>
                  <input ref={input => this.postalCode = input} id="postalCode" name="postalCode" className="form-text" type="text" onKeyUp={this.handleFilter}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <h2 className="card-title">Total Sales Volume</h2>
            <div className="card">
              <div className="row">
                <div className="md-4 column stats-number">
                  <span>${this.getDollars(preparedData.totalVolume)}</span>
                  <h3>Total Sales</h3>
                </div>
                <div className="md-8 column stats-chart">
                  <ChartsWrapper type="line" data={data} options={options}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Total;