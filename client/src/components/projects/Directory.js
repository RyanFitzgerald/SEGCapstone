import React from 'react';
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
    document.title = 'Project Directory | Renovaction';

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
      postalCode: this.postalCode.value,
      street: this.street.value,
      status: this.status.value,
      type: this.type.value
    };
    this.props.searchProjects(query);
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

    return (
      <div className="content">
        <div className="row">
          <div className="column">
            <h2 className="card-title">Filter Projects</h2>
            <div className="card">
              <input ref={input => this.q = input} className="form-text" type="text" placeholder="Enter the project name" onKeyUp={this.handleSearch}/>
              <button className="advanced__toggle" id="advanced-toggle" onClick={this.resetForm}>Reset Form</button>
              <button className="advanced__toggle" id="advanced-toggle" onClick={this.handleAdvanced}>Advanced Search</button>
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
                  {projects.map((project, key) => {
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Directory;