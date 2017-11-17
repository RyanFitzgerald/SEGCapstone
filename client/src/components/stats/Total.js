import React from 'react';
import ChartsWrapper from '../ChartsWrapper';

class Total extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    // Set title
    document.title = 'Total Sales Volume | Renovaction';

    // Update active tab
    this.props.setActiveSubtab(1);
  }

  handleFilter() {

  }

  render() {
    const data = {
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
                  <span>$23,232.00</span>
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