import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as api from '../../api';

import Loading from '../Loading';
import Map from '../Map';

class View extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.getClient = this.getClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this);

    // Initial state
    this.state = {
      client: null,
      redirect: null
    }
  }

  componentDidMount() {
    // Update tab
    this.props.setActiveSubtab(0);

    // Get client
    this.getClient(this.props.location.match.params.id);
  }

  getClient(id) {
    api.getClient(id).then(client => {
      this.setState({ client }, () => {
        // Set title
        document.title = `${this.state.client.name} | Renovaction`;
      })
    });
  }

  deleteClient() {
    const id = this.props.location.match.params.id;
    api.deleteClient(id).then(result => {
      if (result) {
        this.props.removeFromClients(id);
        this.setState({
          redirect: '/clients/list'
        });
      }
    });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={this.state.redirect}/>
      );
    }

    if (this.state.client) {
      return (
        <div className="content">
          <div className="row">
            <div className="md-6 column">
              <h2 className="card-title">Client Overview</h2>
              <div className="card">
                <ul className="client-overview">
                  <li><b>Date Created:</b> {moment(this.state.client.created).format('MMMM Do, YYYY')}</li>
                  <li><b>Name:</b> {this.state.client.name}</li>
                  <li><b>Email:</b> <a href={'mailto:' + this.state.client.email}>{this.state.client.email}</a></li>
                  <li><b>Telephone:</b> <a href={'tel:' + this.state.client.telephone}>{this.state.client.telephone}</a></li>
                  <li><b>Sold by:</b> Joseph Doe</li>
                </ul>
                <div className="client-actions">
                  <Link to={`/clients/${this.props.location.match.params.id}/edit`} className="btn btn--primary">Edit Client</Link>
                  <button className="btn btn--danger" onClick={() => {if (window.confirm('Are you sure you want to delete this client?')) {this.deleteClient()};}}>Delete Client</button>
                </div>
              </div>
            </div>
            <div className="md-6 column">
              <h2 className="card-title">Client Location</h2>
              <div className="card">
                <div id="map" className="client-map">
                  <Map google={window.google} lat={this.state.client.location.coordinates[1]} long={this.state.client.location.coordinates[0]} />
                </div>
                <div className="client-location">
                  <p>{this.state.client.street}<br/>{this.state.client.city}, ON <span className="capitalize">{this.state.client.postalCode}</span></p>
                  <a href={`https://www.google.com/maps?saddr=My+Location&daddr=${encodeURI(this.state.client.street)}+${this.state.client.city}`} target="_blank">Get Directions</a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="md-6 column">
              <h2 className="card-title">{this.state.client.projects.length} Client Project(s) 
                <Link 
                  to={{
                    pathname: '/projects/add',
                    query: {client: this.state.client._id}
                  }}
                  className="btn btn--primary btn--small">
                  Add Project
                </Link>
              </h2>
              <div className="card">
              <table className="card__table">
                <thead className="card__tablehead">
                  <tr>
                    <th>Nickname</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="card__tablebody">
                  {this.state.client.projects.map((project, key) => {
                    return (
                      <tr key={key}>
                        <td>{project.name}</td>
                        <td><span className={`status status--${project.status.replace(/\s+/g, '').toLowerCase()}`}>{project.status}</span></td>             
                        <td><Link to={`/projects/${project._id}`} className="btn btn--small btn--primary">View Project</Link></td>
                      </tr>
                    );
                  })}
                </tbody> 
              </table>
              </div>
            </div>
            <div className="md-6 column">
              <h2 className="card-title">{this.state.client.notes.length} Client Note(s) 
                <Link 
                  to={{
                    pathname: `${this.props.location.match.url}/note`,
                    query: {name: this.state.client.name}
                  }}
                  className="btn btn--primary btn--small">
                  Add Note
                </Link>
              </h2>
              <div className="card">
              {this.state.client.notes.map((note, key) => {
                return (
                  <div className="client-note" key={key}>
                    <span className="client-note__details">Posted by <b>John Doe</b> on <b>{moment(note.created).format('MMMM Do, YYYY')}</b></span>
                    <p>
                      {note.description}
                    </p>
                  </div>
                );
              })}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <Loading/>
    );
    
  }
}

export default View;