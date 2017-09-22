import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Directory extends React.Component {
  componentDidMount() {
    // Set title
    document.title = 'Project Directory | Renovaction';

    // Update tab
    this.props.setActiveSubtab(3);
  }

  render() {
    // Variables
    const projects = this.props.projects || [];
    const cities = [];
    projects.map(ele => {
      if (cities.indexOf(ele.city) === -1) {
        cities.push(ele.city);
      }
      return;
    });

    return (
      <div className="content">
        <div className="row">
          <div className="column">
            <h2 className="card-title">Filter Projects</h2>
            <div className="card">
              <input className="form-text" type="text" placeholder="Enter the project name"/>
              <a href="#" className="advanced__toggle" id="advanced-toggle">Advanced Search</a>
              <div id="advanced-fields" className="row card__advanced">
                <div className="md-6 column">
                  <label className="form-label" htmlFor="postal-code">Postal Code</label>
                  <input id="postal-code" name="postal-code" className="form-text" type="text" placeholder="Postal Code"/>
                </div>
                <div className="md-6 column">
                  <label className="form-label" htmlFor="city">City</label>
                  <span className="form-select">
                    <select id="city" name="city">
                      <option>All Cities</option>
                    </select>
                  </span>
                </div>
                <div className="md-6 column">
                  <label className="form-label" htmlFor="type">Project Type</label>
                  <span className="form-select">
                    <select id="type" name="type">
                      <option>All Project Types</option>
                    </select>
                  </span>
                </div>
                <div className="md-6 column">
                  <label className="form-label" htmlFor="salesman">Salesman</label>
                  <span className="form-select">
                    <select id="salesman" name="salesman">
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="card__tablebody">
                  {projects.map((project, key) => {
                    const types = [];
                    project.type.map(ele => {
                      types.push(ele.name);
                      return;
                    });

                    return (
                      <tr key={key}>
                        <td>{project.name}</td>
                        <td>{types.join(', ')}</td>
                        <td><span className={`status status--${project.status.replace(/\s+/g, '').toLowerCase()}`}>{project.status}</span></td>                
                        <td><Link to={`/clients/${project.client._id}`}>{project.client.name}</Link></td>
                        <td>{project.street}</td>
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

Directory.propTypes = {
  setActiveSubtab: PropTypes.func.isRequired
};

export default Directory;