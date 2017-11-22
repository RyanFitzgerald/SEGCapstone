import React from 'react';
import moment from 'moment';
import * as api from '../../api';

import Loading from '../Loading';
import Filter from './Filter';
import ChartsWrapper from '../ChartsWrapper';

class Type extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSubFilter = this.handleSubFilter.bind(this);
    this.getTotalVolumeByType = this.getTotalVolumeByType.bind(this);
    this.prepareData = this.prepareData.bind(this);
    this.prepareSubData = this.prepareSubData.bind(this);
    this.getDollars = this.getDollars.bind(this);

    // Set state
    this.state = {
      volume: null,
      result: null,
      subresult: null
    }
  }

  componentDidMount() {
    // Set title
    document.title = 'Totals by Type | Renovaction';

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
      this.setState({ volume: result });
      this.prepareData(result);
    });
  }

  prepareData(volume) {
    const dataPointsVolume = [];
    const dataPointsCount = [];
    const labelTotals = {};
    const labelCounts = {};
    const dataLabels = [];
    let totalVolume = 0;
    
    // Loop over all projects
    volume.forEach(ele => {
      // Iterate over each type per project
      ele.type.forEach(type => {
        const typeName = type.name;

        // Only push label if not already there
        if (!dataLabels.includes(typeName)) {
          dataLabels.push(typeName);
        }

        // If not already in totals, set both arrays to 0
        if (!(typeName in labelTotals)) {
          labelTotals[typeName] = 0;
          labelCounts[typeName] = 0;
        }

        // Increment both
        labelTotals[typeName] += ele.contractCost;
        labelCounts[typeName] += 1;
      });

      // Add to total volume
      totalVolume = totalVolume + ele.contractCost;
    });

    // Loop over sales volume totals and push to array
    Object.keys(labelTotals).forEach(label => {
      dataPointsVolume.push(((labelTotals[label]/totalVolume)*100).toFixed(2));
    });

    Object.keys(labelCounts).forEach(label => {
      dataPointsCount.push(labelCounts[label]);
    });

    this.setState({
      result: {
        dataPointsCount,
        dataPointsVolume,
        dataLabels,
        totalVolume
      }
    });

    this.prepareSubData(volume, dataLabels[0]);
  }

  prepareSubData(volume, label) {
    const dataPoints = [];
    const dataLabels = [];
    let totalVolume = 0;
    
    volume.forEach(ele => {
      ele.type.forEach(type => {
        if (type.name === label) {
          totalVolume = totalVolume + ele.contractCost;
          dataPoints.push((totalVolume/100).toFixed(2));
          dataLabels.push(moment(ele.soldDate).format('MMMM DD, YYYY'));
        }
      });
    });

    this.setState({
      subresult: {
        dataPoints,
        dataLabels,
        totalVolume
      }
    });
  }

  getDollars(cents) {
    const dollars = (cents/100).toFixed(2);
    let dollarString = dollars.toString().split('.');

    if (dollarString[0].length >= 4) {
      dollarString[0] = dollarString[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }

    return dollarString.join('.');
  }

  handleFilter(startDateEle, endDateEle, postalCodeEle) {
    // Get values
    const startDate = (startDateEle.field.value !== '') ? new Date(startDateEle.field.value) : '';
    const endDate = (endDateEle.field.value !== '') ? new Date(endDateEle.field.value) : '';
    const postalCode = postalCodeEle.value;

    // Build query
    const query = {
      search: true,
      startDate,
      endDate,
      postalCode,
      access_token: JSON.parse(sessionStorage.getItem('user')).access_token
    };

    api.getTotalVolumeByType(query).then(result => {
      this.setState({ volume: result });
      this.prepareData(result);
    });
  }

  handleSubFilter(e) {
    const label = e.target.value;
    this.prepareSubData(this.state.volume, label);
  }

  render() {
    if (!this.state.result || !this.state.subresult) {
      return(
        <Loading/>
      );
    }

    const pieColours = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ];

    const allDataVolume = {
      datasets: [{
        data: this.state.result.dataPointsVolume,
        backgroundColor: pieColours.slice(0, this.state.result.dataPointsVolume.length)
      }],
      labels: this.state.result.dataLabels
    };

    const allDataCount = {
      datasets: [{
        data: this.state.result.dataPointsCount,
        backgroundColor: pieColours.slice(0, this.state.result.dataPointsCount.length)
      }],
      labels: this.state.result.dataLabels
    };

    const singleDataVolume = {
      labels: this.state.subresult.dataLabels,
      datasets: [{
        label: 'Sales Volume',
        data: this.state.subresult.dataPoints,
        backgroundColor: [
          'rgba(54, 162, 235, 0.4)'
        ],
        borderColor: [
          'rgba(54, 100, 235, 1)'
        ],
        borderWidth: 1
      }]
    };

    return (
      <div className="content">
        <Filter handleFilter={this.handleFilter} resetFilter={this.getTotalVolumeByType}/>
        <div className="row">
          <div className="column">
            <h2 className="card-title">Totals by Type</h2>
            <div className="card">
              <div className="row">
                <div className="md-6 column stats-chart">
                  <h3>Sales Volume by Type</h3>
                  <ChartsWrapper type="pie" data={allDataVolume}/>
                </div>
                <div className="md-6 column stats-chart">
                  <h3>Number of Projects by Type</h3>
                  <ChartsWrapper type="pie" data={allDataCount}/>
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
                    {this.state.result.dataLabels.map((label, key) => {
                      return (
                        <option key={key} value={label}>{label}</option>
                      );
                    })}  
                    </select>
                  </span>
                </div>
                <div className="md-4 column stats-number">
                  <span>${this.getDollars(this.state.subresult.totalVolume)}</span>
                  <h3>Total Sales</h3>
                </div>
                <div className="md-8 column stats-chart">
                  <ChartsWrapper type="line" data={singleDataVolume}/>
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