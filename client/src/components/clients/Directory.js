import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Directory extends React.Component {
  componentDidMount() {
    // Set title
    document.title = 'Client Directory | Renovaction';

    // Update tab
    this.props.setActiveSubtab(3);
  }

  render() {
    // Variables
    const clients = this.props.clients || [];

    return (
      <div className="content">
        <div className="row">
          <div className="column">
            <h2 className="card-title">Filter Clients</h2>
            <div className="card">
              <input className="form-text" type="text" placeholder="Enter the client name"/>
              <a className="advanced__toggle" id="advanced-toggle">Advanced Search</a>
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
            <h2 className="card-title">{clients.length} Clients</h2>
            <div className="card">
              <table className="card__table">
                <thead className="card__tablehead">
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Street</th>
                    <th>Telephone</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="card__tablebody">
                  {clients.map((client, key) => {
                    return (
                      <tr key={key}>
                        <td>{client.firstName}</td>
                        <td>{client.lastName}</td>
                        <td>{client.street}</td>
                        <td><a href={'tel:' + client.telephone}>{client.telephone}</a></td>
                        <td><a href={'mailto:' + client.email}>{client.email}</a></td>
                        <td><Link to={'/clients/' + client._id} className="btn btn--small btn--primary">View Client</Link></td>
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
  clients: PropTypes.array.isRequired
};

export default Directory;