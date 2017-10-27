import React from 'react';
import { Link } from 'react-router-dom';
import {Marker} from 'google-maps-react';
import Map from '../Map';
import json2csv from 'json2csv';

class Directory extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleAdvanced = this.handleAdvanced.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
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
      type: this.type.value
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
    const fields = ['name', 'type', 'street', 'postalCode', 'city', 'created', 'soldDate', 'startDate', 'endDate', 'cashinDate', 'actualCost', 'labourCost', 'materialCost'];

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

  // TODO Allow user to decide number of items per page by settting projectsPerPage
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

  render() {
    // Variables
    const projects = this.props.projects || [];
    const cities = [];
    projects.forEach(ele => {
      if (cities.indexOf(ele.city) === -1) {
        cities.push(ele.city);
      }
    });
    const types = this.props.types || [];
    const visibleProjects = projects.slice(((this.state.activePage - 1) * this.state.projectsPerPage), this.state.activePage * this.state.projectsPerPage);

    return (
      <div className="content">
        <div className="row">
          <div className="column">
            <h2 className="card-title">Filter Projects</h2>
            <div className="card">
              <input ref={input => this.q = input} className="form-text" type="text" placeholder="Enter the project name" onKeyUp={this.handleSearch}/>
              <button className="advanced__toggle" id="advanced-toggle" onClick={this.handleAdvanced}>Toggle Advanced Search</button>
              <div ref={el => this.advanced = el} id="advanced-fields" className="row card__advanced">
                <div className="md-4 column">
                  <label className="form-label" htmlFor="street">Street</label>
                  <input ref={input => this.street = input} id="street" name="street" className="form-text" type="text" onKeyUp={this.handleSearch}/>
                </div>
                <div className="md-4 column">
                  <label className="form-label" htmlFor="postal-code">Postal Code</label>
                  <input ref={input => this.postalCode = input} id="postal-code" name="postal-code" className="form-text capitalize" type="text" onKeyUp={this.handleSearch}/>
                </div>
                <div className="md-4 column">
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
              <table className="card__table">
                <thead className="card__tablehead">
                  <tr>
                    <th>Nickname</th>
                    <th>Type(s)</th>
                    <th>Status</th>
                    <th>Client</th>
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
                        <td className="card__table--max">{project.name}</td>
                        <td>{types.join(', ')}</td>
                        <td><span className={`status status--${project.status.replace(/\s+/g, '').toLowerCase()}`}>{project.status}</span></td>                
                        <td><Link to={`/clients/${project.client._id}`}>{project.client.name}</Link></td>
                        <td>{project.street}</td>
                        <td>{project.postalCode}</td>
                        <td><Link to={`/projects/${project._id}`} className="btn btn--small btn--primary">View Project</Link></td>
                      </tr>
                    );
                  })}
                </tbody> 
              </table>
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
                <Map google={window.google} zoom={10} lat={45.4215296} long={-75.69719309999999}>
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