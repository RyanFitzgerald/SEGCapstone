import React from 'react';
import moment from 'moment';
import * as api from '../../api';

import Loading from '../Loading';
import Filter from './Filter';
import ChartsWrapper from '../ChartsWrapper';

class Salesmen extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSubFilter = this.handleSubFilter.bind(this);
    this.getTotalVolumeByReferral = this.getTotalVolumeByReferral.bind(this);
    this.prepareData = this.prepareData.bind(this);
    this.getDollars = this.getDollars.bind(this);

    // Set state
    this.state = {
      volume: null
    }
  }

  componentDidMount() {
    // Set title
    document.title = 'Totals by Referral | Renovaction';

    // Update active tab
    this.props.setActiveSubtab(4);

    // Get total volume
    this.getTotalVolumeByReferral();
  }

  getTotalVolumeByReferral() {
    const query = {
      access_token: JSON.parse(sessionStorage.getItem('user')).access_token
    };

    api.getTotalVolumeByReferral(query).then(result => {
      this.setState({volume: result});
    });
  }

  prepareData(volume) {
    const dataPointsVolume = [];
    const dataPointsCount = [];
    const labelTotals = {};
    const labelCounts = {};
    const dataLabels = [];
    let totalVolume = 0;

    // Loop over all records
    volume.forEach(ele => {
      const referral = ele.referral.name;

      // Only push label if not already there
      if (!dataLabels.includes(referral)) {
        dataLabels.push(referral);
      }

      // Loop over client projects
      ele.projects.forEach(project => {
        
        // If not already in totals, set both arrays to 0
        if (!(referral in labelTotals)) {
          labelTotals[referral] = 0;
          labelCounts[referral] = 0;
        }

        // Increment both
        labelTotals[referral] += project.contractCost;
        labelCounts[referral] += 1;

        // Add to total volume
        totalVolume = totalVolume + project.contractCost;
      });
    });
 
    // Loop over sales volume totals and push to array
    Object.keys(labelTotals).forEach(label => {
      dataPointsVolume.push((labelTotals[label]/totalVolume)*100);
    });

    Object.keys(labelCounts).forEach(label => {
      dataPointsCount.push(labelCounts[label]);
    });

    return {dataPointsVolume, dataPointsCount, dataLabels};
  }

  getDollars(cents) {
    const dollars = (cents/100).toFixed(2);
    let dollarString = dollars.toString().split('.');

    if (dollarString[0].length >= 4) {
      dollarString[0] = dollarString[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }

    return dollarString.join('.');
  }

  handleFilter(startDate, endDate, postalCode) {
    // TO DO
    console.log({startDate, endDate, postalCode})
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

    const allDataVolume = {
      datasets: [{
        data: preparedData.dataPointsVolume,
        backgroundColor: pieColours.slice(0, preparedData.dataPointsVolume.length)
      }],
      labels: preparedData.dataLabels
    };

    const allDataCount = {
      datasets: [{
        data: preparedData.dataPointsCount,
        backgroundColor: pieColours.slice(0, preparedData.dataPointsCount.length)
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
        <Filter handleFilter={this.handleFilter}/>
        <div className="row">
          <div className="column">
            <h2 className="card-title">Totals by Referral</h2>
            <div className="card">
              <div className="row">
                <div className="md-6 column stats-chart">
                  <h3>Sales Volume by Referral</h3>
                  <ChartsWrapper type="pie" data={allDataVolume}/>
                </div>
                <div className="md-6 column stats-chart">
                  <h3>Number of Projects by Referral</h3>
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
                      <option value="">Website</option>
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

export default Salesmen;