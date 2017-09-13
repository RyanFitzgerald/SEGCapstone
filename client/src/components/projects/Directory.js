import React from 'react';
import PropTypes from 'prop-types';

class Directory extends React.Component {
  componentDidMount() {
    // Set title
    document.title = 'Project Directory | Renovaction';

    // Update tab
    this.props.setActiveSubtab(3);
  }

  render() {
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
            <h2 className="card-title">3 Projects</h2>
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
                  <tr>
                    <td>John Doe Roofing</td>
                    <td>Roofing</td>
                    <td><span className="status status--inprogress">In Progress</span></td>                
                    <td><a href="#">John Doe</a></td>
                    <td>Test content</td>
                    <td><a href="#" className="btn btn--small btn--primary">View Project</a></td>
                  </tr>
                  <tr>
                    <td>John Doe Roofingt</td>
                    <td>Roofing, Windows</td>
                    <td><span className="status status--complete">Complete</span></td>
                    <td><a href="#">John Doe</a></td>
                    <td>Test content</td>
                    <td><a href="#" className="btn btn--small btn--primary">View Project</a></td>
                  </tr>
                  <tr>
                    <td>John Doe Roofing</td>
                    <td>Roofing</td>
                    <td><span className="status status--notstarted">Not Started</span></td>
                    <td><a href="#">John Doe</a></td>
                    <td>Test content</td>
                    <td><a href="#" className="btn btn--small btn--primary">View Project</a></td>
                  </tr>
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