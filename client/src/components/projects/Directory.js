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
      projectsPerPage: 10
    };
  }

  componentDidMount() {
    // Set title
    document.title = 'Project Directory | Renovaction';

    // Update tab
    this.props.setActiveSubtab(1);
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
      status: this.status.value,
      type: this.type.value,
      search: true
    };
    this.props.getProjects(query);
  }

  handlePagination(page) {
    this.setState({
      activePage: page
    });
  }

  handleDownload() {
    // Get projects
    const projects = this.props.projects || [];

    // Turn types nested object to string
    projects.forEach((project, index) => {
      let types = [];
      project.type.forEach((item, i) => {
        types.push(item.name);
      });
      projects[index].type = types.toString();
    });

    // Get fields needed
    const fields = ['fileNumber', 'type', 'houseNumber', 'street', 'city', 'postalCode', 'created', 'soldDate', 'startDate', 'endDate', 'cashinDate', 'labourCost', 'materialCost', 'par', 'salesPrice'];

    // Convert to csv
    const csvContent = json2csv({data: projects, fields});

    // Create link and name
    const downloadLink = document.createElement('a');
    const blob = new Blob(['\ufeff', csvContent]);
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = 'project-list.csv';
    
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
    this.status.value = '';
    this.type.value = ''; 
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
    const pages = Math.ceil(count / this.state.projectsPerPage);

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

  renderLoading(projects) {
    if (projects.length < 1) {
      return (
        <Loading/>
      )
    }
  }

  render() {
    // Variables
    const projects = this.props.projects || [];
    const types = this.props.types || [];
    const fileSortClass = this.sortIcon(this.props.sort.fileNumber);
    const clientSortClass = this.sortIcon(this.props.sort.client);
    const statusSortClass = this.sortIcon(this.props.sort.status);
    const visibleProjects = projects.slice(((this.state.activePage - 1) * this.state.projectsPerPage), this.state.activePage * this.state.projectsPerPage);

    return (
      <div className="content">
        <div className="row">
          <div className="column">
            <h2 className="card-title">Filter Projects</h2>
            <div className="card">
              <input ref={input => this.q = input} className="form-text" type="text" placeholder="Enter the project file number" onKeyUp={this.handleSearch}/>
              <button className="advanced__toggle" id="advanced-toggle" onClick={this.handleAdvanced}>Toggle Advanced Search</button>
              <div ref={el => this.advanced = el} id="advanced-fields" className="row card__advanced">
                <div className="md-4 column">
                  <label className="form-label" htmlFor="street">Street</label>
                  <input ref={input => this.street = input} id="street" name="street" className="form-text" type="text" onKeyUp={this.handleSearch}/>
                </div>
                <div className="md-4 column">
                  <label className="form-label" htmlFor="city">City</label>
                  <input ref={input => this.city = input} id="city" name="city" className="form-text" type="text" onKeyUp={this.handleSearch}/>
                </div>
                <div className="md-4 column">
                  <label className="form-label" htmlFor="postal-code">Postal Code</label>
                  <input ref={input => this.postalCode = input} id="postal-code" name="postal-code" className="form-text capitalize" type="text" onKeyUp={this.handleSearch}/>
                </div>
                <div className="md-6 column">
                  <label className="form-label" htmlFor="city">Status</label>
                  <span className="form-select">
                    <select ref={input => this.status = input} id="city" name="city" onChange={this.handleSearch}>
                      <option value="">All Statuses</option>
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Complete">Complete</option>
                    </select>
                  </span>
                </div>
                <div className="md-6 column">
                  <label className="form-label" htmlFor="type">Project Type</label>
                  <span className="form-select">
                    <select ref={input => this.type = input} id="type" name="type" onChange={this.handleSearch}>
                      <option value="">All Project Types</option>
                      {types.map((type, key) => {
                        return <option key={key} value={type._id}>{type.name}</option>;
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
            <h2 className="card-title">{projects.length} Project(s)</h2>
            <div className="card">
              <div className="card__table-wrapper">
                <table className="card__table">
                  <thead className="card__tablehead">
                    <tr>
                      <th onClick={() => this.props.sortByKey(projects, 'fileNumber')}>File # <i className={`fa ${fileSortClass}`}></i></th>
                      <th onClick={() => this.props.sortByKey(projects, 'client.lastName')}>Client <i className={`fa ${clientSortClass}`}></i></th>
                      <th>Type(s)</th>
                      <th onClick={() => this.props.sortByKey(projects, 'status')}>Status <i className={`fa ${statusSortClass}`}></i></th>
                      <th>Street</th>
                      <th>Postal Code</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="card__tablebody">
                    {visibleProjects.map((project, key) => {
                      const types = [];
                      project.type.forEach(ele => {
                        types.push(ele.name);
                      });

                      return (
                        <tr key={key}>
                          <td className="card__table--max">{project.fileNumber}</td>
                          <td><Link to={`/clients/${project.client._id}`}>{project.client.firstName} {project.client.lastName}</Link></td>
                          <td>{types.join(', ')}</td>
                          <td><span className={`status status--${project.status.replace(/\s+/g, '').toLowerCase()}`}>{project.status}</span></td>                
                          <td>{project.houseNumber} {project.street}</td>
                          <td>{project.postalCode}</td>
                          <td><Link to={`/projects/${project._id}`} className="btn btn--small btn--primary">View Project</Link></td>
                        </tr>
                      );
                    })}
                  </tbody> 
                </table>
              </div>
              
              {this.renderLoading(projects)}
              {this.renderPagination(projects.length)}
              <button className="advanced__toggle" onClick={this.handleDownload}>Download Project List (CSV)</button>
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
                  {visibleProjects.map((project, key) => {
                    return (
                      <Marker 
                        key={key}
                        title={project.name}
                        position={{lat: project.location.coordinates[1], lng: project.location.coordinates[0]}} 
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