import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Directory extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleAdvanced = this.handleAdvanced.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
    // Set title
    document.title = 'Client Directory | Renovaction';

    // Update tab
    this.props.setActiveSubtab(3);
  }

  handleAdvanced(e) {
    e.preventDefault();
    if (this.advanced.classList.contains('active')) {
      this.advanced.classList.remove('active');
    } else {
      this.advanced.classList.add('active');
    }
  }

  handleSearch() {
    const query = {
      q: this.q.value,
      city: this.city.value,
      postalCode: this.postalCode.value
    };
    this.props.searchClients(query);
  }

  resetForm() {
    this.q.value = '';
    this.city.value = '';
    this.postalCode.value = '';
  }

  render() {
    // Variables
    const clients = this.props.clients || [];
    const cities = [];
    clients.map(ele => {
      if (cities.indexOf(ele.city) === -1) {
        cities.push(ele.city);
      }
    });

    return (
      <div className="content">
        <div className="row">
          <div className="column">
            <h2 className="card-title">Filter Clients</h2>
            <div className="card">
              <input ref={input => this.q = input} className="form-text" type="text" placeholder="Enter the client name" onKeyUp={this.handleSearch}/>
              <button className="advanced__toggle" id="advanced-toggle" onClick={this.resetForm}>Reset Form</button>
              <button className="advanced__toggle" id="advanced-toggle" onClick={this.handleAdvanced}>Advanced Search</button>
              <div ref={el => this.advanced = el} id="advanced-fields" className="row card__advanced">
                <div className="md-6 lg-4 column">
                  <label className="form-label" htmlFor="postal-code">Postal Code</label>
                  <input ref={input => this.postalCode = input} id="postal-code" name="postal-code" className="form-text capitalize" type="text" onKeyUp={this.handleSearch}/>
                </div>
                <div className="md-6 lg-4 column">
                  <label className="form-label" htmlFor="city">City</label>
                  <span className="form-select">
                    <select ref={input => this.city = input} id="city" name="city" onChange={this.handleSearch}>
                      <option value="">All Cities</option>
                      {cities.map((city, key) => {
                        return <option key={key} value={city}>{city}</option>;
                      })}
                    </select>
                  </span>
                </div>
                <div className="lg-4 column">
                  <label className="form-label" htmlFor="salesman">Salesman</label>
                  <span className="form-select">
                    <select ref={input => this.salesman = input} id="salesman" name="salesman">
                      <option>All Salesmen</option>
                    </select>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <h2 className="card-title">{clients.length} Clients</h2>
            <div className="card">
              <table className="card__table">
                <thead className="card__tablehead">
                  <tr>
                    <th>Name</th>
                    <th>Street</th>
                    <th>Postal Code</th>
                    <th>City</th>
                    <th>Telephone</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="card__tablebody">
                  {clients.map((client, key) => {
                    return (
                      <tr key={key}>
                        <td>{client.name}</td>
                        <td>{client.street}</td>
                        <td className="capitalize">{client.postalCode}</td>
                        <td>{client.city}</td>
                        <td><a href={'tel:' + client.telephone}>{client.telephone}</a></td>
                        <td><a href={'mailto:' + client.email}>{client.email}</a></td>
                        <td><Link to={`/clients/${client._id}`} className="btn btn--small btn--primary">View Client</Link></td>
                      </tr>
                    );
                  })}
                </tbody> 
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Directory.propTypes = {
  setActiveSubtab: PropTypes.func.isRequired,
  searchClients: PropTypes.func.isRequired,
  clients: PropTypes.array.isRequired
};

export default Directory;