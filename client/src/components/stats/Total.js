import React from 'react';
import moment from 'moment';
import * as api from '../../api';

import Loading from '../Loading';
import Filter from './Filter';
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
      result: null
    };
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
      this.prepareData(result);
    });
  }

  prepareData(volume) {
    const dataPoints = [];
    const dataLabels = [];
    let totalVolume = 0;
    
    volume.forEach(ele => {
      totalVolume = totalVolume + ele.contractCost;
      dataPoints.push((totalVolume/100).toFixed(2));
      dataLabels.push(moment(ele.soldDate).format('MMMM DD, YYYY'));
    });

    this.setState({
      result: {
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

    api.getTotalVolume(query).then(result => {
      this.prepareData(result);
    });
  }

  render() {
    if (!this.state.result) {
      return(
        <Loading/>
      );
    }

    const data = {
      labels: this.state.result.dataLabels,
      datasets: [{
        label: 'Sales Volume',
        data: this.state.result.dataPoints,
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
        <Filter handleFilter={this.handleFilter} resetFilter={this.getTotalVolume}/>
        <div className="row">
          <div className="column">
            <h2 className="card-title">Total Sales Volume</h2>
            <div className="card">
              <div className="row">
                <div className="md-4 column stats-number">
                  <span>${this.getDollars(this.state.result.totalVolume)}</span>
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