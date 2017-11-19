import React from 'react';
import moment from 'moment';
import * as api from '../../api';

import Loading from '../Loading';
import ChartsWrapper from '../ChartsWrapper';

class Type extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSubFilter = this.handleSubFilter.bind(this);
    this.getTotalVolumeByType = this.getTotalVolumeByType.bind(this);
    this.prepareData = this.prepareData.bind(this);
    this.getDollars = this.getDollars.bind(this);

    // Set state
    this.state = {
      volume: null
    }
  }

  componentDidMount() {
    // Set title
    document.title = 'Total Sales Volume by Type | Renovaction';

    // Update active tab
    this.props.setActiveSubtab(2);

    // Get Total Volume
    this.getTotalVolumeByType();
  }

  getTotalVolumeByType() {
    const query = {
      access_token: JSON.parse(sessionStorage.getItem('user')).access_token
    };

    api.getTotalVolumeByType(query).then(result => {
      this.setState({volume: result});
    });
  }

  prepareData(volume) {
    const dataPoints = [];
    const labelTotals = {};
    const dataLabels = [];
    let totalVolume = 0;
    
    volume.forEach(ele => {
      ele.type.forEach(type => {
        const typeName = type.name;

        if (!dataLabels.includes(typeName)) {
          dataLabels.push(typeName);
        }

        if (!(typeName in labelTotals)) {
          labelTotals[typeName] = 0;
        }

        labelTotals[typeName] += ele.contractCost;
      });

      // Add to total volume
      totalVolume = totalVolume + ele.contractCost;
    });

    Object.keys(labelTotals).forEach(label => {
      dataPoints.push((labelTotals[label]/totalVolume)*100);
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

  handleSubFilter() {
    
  }

  render() {
    if (!this.state.volume) {
      return(
        <Loading/>
      );
    }

    // Get prepared data
    const preparedData = this.prepareData(this.state.volume);
    const pieColours = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ];

    const allData = {
      datasets: [{
        data: preparedData.dataPoints,
        backgroundColor: pieColours.slice(0, preparedData.dataPoints.length)
      }],
      labels: preparedData.dataLabels
    };

    const singleData = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [{
        label: 'Sales Volume',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
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
            <h2 className="card-title">Totals by Type</h2>
            <div className="card">
              <div className="row">
                <div className="md-6 column stats-chart">
                  <h3>Sales Volume by Type</h3>
                  <ChartsWrapper type="pie" data={allData}/>
                </div>
                <div className="md-6 column stats-chart">
                  <h3>Number of Projects by Type</h3>
                  <ChartsWrapper type="pie" data={allData}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <h2 className="card-title">Total Sales Volume for Specific Type</h2>
            <div className="card">
              <div className="row">
                <div className="column">
                  <span className="form-select">
                    <select ref={input => this.month = input} id="year" name="year" onChange={this.handleSubFilter}>
                      <option value="">Roofing</option>
                    </select>
                  </span>
                </div>
                <div className="md-4 column stats-number">
                  <span>$23,232.00</span>
                  <h3>Total Sales</h3>
                </div>
                <div className="md-8 column stats-chart">
                  <ChartsWrapper type="line" data={singleData}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Type;