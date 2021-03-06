import React from 'react';
import { Link } from 'react-router-dom';
import {Marker} from 'react-google-maps';
import Map from '../Map';
import json2csv from 'json2csv';

import Loading from '../Loading';

import { mapAPIKey } from '../../config';

class Directory extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleAdvanced = this.handleAdvanced.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.handleDownload = this.handleDownload.bind(this);

    this.state = {
      activePage: 1,
      clientsPerPage: 10,
      salesmen: []
    };
  }

  componentDidMount() {
    // Set title
    document.title = 'Client Directory | Renovaction';

    // Update tab
    this.props.setActiveSubtab(1);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users && nextProps.users !== null && nextProps.users !== this.state.salesmen) {
      const salesmen = nextProps.users.filter(user => user.role.name === 'Salesman');
      this.setState({ salesmen });
    }
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
      postalCode: this.postalCode.value,
      street: this.street.value,
      salesman: this.salesman.value,
      search: true
    };
    this.props.getClients(query);
  }

  handlePagination(page) {
    this.setState({
      activePage: page
    });
  }

  handleDownload() {
    // Get clients
    const clients = this.props.clients || [];

    // Get fields needed
    const fields = ['firstName', 'lastName', 'email', 'homePhone', 'mobilePhone', 'workPhone', 'houseNumber', 'street', 'city', 'postalCode', 'created'];

    // Convert to csv
    const csvContent = json2csv({data: clients, fields});

    // Create link and name
    const downloadLink = document.createElement('a');
    const blob = new Blob(['\ufeff', csvContent]);
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = 'client-list.csv';
    
    // Trigger download then delete
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  resetForm() {
    this.q.value = '';
    this.city.value = '';
    this.postalCode.value = '';
    this.street.value = '';
    this.salesman.value = '';
    this.handleSearch();
  }

  sortIcon(order) {
    switch(order) {
      case 'asc': return 'fa-caret-down';
      case 'desc': return 'fa-caret-up';
      default: return '';
    }
  }

  renderPagination(count) {
    const pages = Math.ceil(count / this.state.clientsPerPage);

    if (pages < 2) {
      return;
    }

    let items = [];
    for (let i = 1; i <= pages; i++) {
      items.push(
        <li key={i} className={this.state.activePage === i ? 'card__pagination-btn card__pagination-btn--active' : 'card__pagination-btn'} onClick={this.handlePagination.bind(this, i)}>
          {i}
        </li>
      );
    }

    return (
      <div className="card__pagination">
        <ul>
          {items}
        </ul>
      </div>
    );
  }

  renderLoading(clients) {
    if (clients.length < 1) {
      return (
        <Loading/>
      )
    }
  }

  render() {
    // Variables
    const clients = this.props.clients || [];
    const nameSortClass = this.sortIcon(this.props.sort.name);
    const emailSortClass = this.sortIcon(this.props.sort.email);
    const citySortClass = this.sortIcon(this.props.sort.city);
    const cities = [];
    clients.forEach(ele => {
      if (cities.indexOf(ele.city) === -1) {
        cities.push(ele.city);
      }
    });

    const visibleClients = clients.slice(((this.state.activePage - 1) * this.state.clientsPerPage), this.state.activePage * this.state.clientsPerPage);

    return (
      <div className="content">
        <div className="row">
          <div className="column">
            <h2 className="card-title">Filter Clients</h2>
            <div className="card">
              <input ref={input => this.q = input} className="form-text" type="text" placeholder="Enter the client last name" onKeyUp={this.handleSearch}/>
              <button className="advanced__toggle" id="advanced-toggle" onClick={this.handleAdvanced}>Toggle Advanced Search</button>
              <div ref={el => this.advanced = el} id="advanced-fields" className="row card__advanced">
                <div className="md-6 column">
                  <label className="form-label" htmlFor="street">Street</label>
                  <input ref={input => this.street = input} id="street" name="street" className="form-text" type="text" onKeyUp={this.handleSearch}/>
                </div>
                <div className="md-6 column">
                  <label className="form-label" htmlFor="postal-code">Postal Code</label>
                  <input ref={input => this.postalCode = input} id="postal-code" name="postal-code" className="form-text capitalize" type="text" onKeyUp={this.handleSearch}/>
                </div>
                <div className="md-6 column">
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
                <div className="md-6 column">
                  <label className="form-label" htmlFor="salesman">Salesman</label>
                  <span className="form-select">
                    <select ref={input => this.salesman = input} id="salesman" name="salesman" onChange={this.handleSearch}>
                      <option value="">All Salesmen</option>
                      {this.state.salesmen.map((salesman, key) => {
                        return <option key={key} value={salesman._id}>{salesman.name}</option>;
                      })}
                    </select>
                  </span>
                </div>
                <button className="advanced__toggle" id="advanced-toggle" onClick={this.resetForm}>Reset Form</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <h2 className="card-title">{clients.length} Client(s)</h2>
            <div className="card">
              <div className="card__table-wrapper">
                <table className="card__table">
                  <thead className="card__tablehead">
                    <tr>
                      <th onClick={() => this.props.sortByKey(clients, 'lastName')}>Name <i className={`fa ${nameSortClass}`}></i></th>
                      <th>Street</th>
                      <th onClick={() => this.props.sortByKey(clients, 'city')}>City <i className={`fa ${citySortClass}`}></i></th>
                      <th>Postal Code</th>       
                      <th onClick={() => this.props.sortByKey(clients, 'email')}>Email <i className={`fa ${emailSortClass}`}></i></th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="card__tablebody">
                    {visibleClients.map((client, key) => {
                      return (
                        <tr key={key}>
                          <td>{client.firstName} {client.lastName}</td>
                          <td>{client.houseNumber} {client.street}</td>
                          <td>{client.city}</td>
                          <td className="capitalize">{client.postalCode}</td>                       
                          <td><a href={'mailto:' + client.email}>{client.email}</a></td>
                          <td><Link to={`/clients/${client._id}`} className="btn btn--small btn--primary">View Client</Link></td>
                        </tr>
                      );
                    })}
                  </tbody> 
                </table>
              </div>
              {this.renderLoading(clients)}
              {this.renderPagination(clients.length)}
              <button className="advanced__toggle" onClick={this.handleDownload}>Download Client List (CSV)</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <h2 className="card-title">Map</h2>
            <div className="card">
              <div id="map" className="project-map project-map--small">
                <Map
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${mapAPIKey}`}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                >
                  {visibleClients.map((client, key) => {
                    return (
                      <Marker 
                        key={key}
                        title={client.name}
                        position={{lat: client.location.coordinates[1], lng: client.location.coordinates[0]}} 
                      />
                    );
                  })}                  
                </Map>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Directory;