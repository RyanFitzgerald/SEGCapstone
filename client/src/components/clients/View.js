import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';
import * as api from '../../api';

import Loading from '../Loading';
import {Marker} from 'react-google-maps';
import Map from '../Map';

import { mapAPIKey } from '../../config';

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
    const query = {
      id,
      access_token: JSON.parse(localStorage.getItem('user')).access_token
    }

    api.getClient(query).then(client => {
      this.setState({ client }, () => {
        // Set title
        document.title = `${this.state.client.firstName} ${this.state.client.lastName} | Renovaction`;
      })
    });
  }

  deleteClient() {
    const query = {
      id: this.props.location.match.params.id,
      access_token: JSON.parse(localStorage.getItem('user')).access_token
    }

    api.deleteClient(query).then(result => {
      if (result) {
        this.props.removeFromClients(query.id);
        this.setState({
          redirect: '/clients'
        });
      } else {
        this.props.addNotification('A problem was encountered when trying to delete the client', 'warn');
      }
    });
  }

  deleteNote(id) {
    const note = {
      id,
      client: this.props.location.match.params.id,
      access_token: JSON.parse(localStorage.getItem('user')).access_token
    };

    api.deleteClientNote(note).then(result => {
      if (result) {
        this.props.addNotification('Successfully deleted note!', 'success');        
        this.getClient(this.props.location.match.params.id);
      }
    });
  }

  render() {
    if (this.state.redirect) {
      this.props.addNotification('Successfully deleted client!', 'success');
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
                  <li><b>Name:</b> {this.state.client.firstName} {this.state.client.lastName}</li>
                  {this.state.client.email &&
                  <li><b>Email:</b> <a href={'mailto:' + this.state.client.email}>{this.state.client.email}</a></li>
                  }
                  {this.state.client.homePhone &&
                  <li><b>Home Phone:</b> <a href={'tel:' + this.state.client.homePhone}>{this.state.client.homePhone}</a></li>
                  }
                  {this.state.client.mobilePhone &&
                  <li><b>Mobile Phone:</b> <a href={'tel:' + this.state.client.mobilePhone}>{this.state.client.mobilePhone}</a></li>
                  }
                  {this.state.client.workPhone &&
                  <li><b>Work Phone:</b> <a href={'tel:' + this.state.client.workPhone}>{this.state.client.workPhone}</a></li>
                  }
                  <li><b>Sold by:</b> {this.state.client.soldBy.name}</li>
                  <li><b>Referral Source:</b> {this.state.client.referral.name}</li>
                  <li><b>Added by:</b> {this.state.client.addedBy.name}</li>
                </ul>
                <div className="client-actions">
                {JSON.parse(localStorage.getItem('user')).role.level >= 2 &&
                  <Link to={`/clients/${this.props.location.match.params.id}/edit`} className="btn btn--primary">Edit Client</Link>
                }
                {JSON.parse(localStorage.getItem('user')).role.level >= 2 &&
                  <button className="btn btn--danger" onClick={() => {if (window.confirm('Are you sure you want to delete this client?')) {this.deleteClient()};}}>Delete Client</button>
                }
                </div>
              </div>
            </div>
            <div className="md-6 column">
              <h2 className="card-title">Client Location</h2>
              <div className="card">
                <div id="map" className="client-map">
                  <Map
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${mapAPIKey}`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  >
                    <Marker 
                      title={`${this.state.client.firstName} ${this.state.client.lastName}`}
                      position={{lat: this.state.client.location.coordinates[1], lng: this.state.client.location.coordinates[0]}} 
                    />
                  </Map>
                </div>
                <div className="client-location">
                  <p>{this.state.client.houseNumber} {this.state.client.street}<br/>{this.state.client.city}, ON <span className="capitalize">{this.state.client.postalCode}</span></p>
                  <a href={`https://www.google.com/maps?saddr=My+Location&daddr=${encodeURI(this.state.client.houseNumber)}+${encodeURI(this.state.client.street)}+${this.state.client.city}`} target="_blank">Get Directions</a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="md-6 column">
              <h2 className="card-title">{this.state.client.projects.length} Client Project(s)
              {JSON.parse(localStorage.getItem('user')).role.level >= 2 &&
                <Link 
                  to={{
                    pathname: '/projects/add',
                    query: {client: this.state.client._id}
                  }}
                  className="btn btn--primary btn--small">
                  Add Project
                </Link>
              }
              </h2>
              <div className="card">
              <table className="card__table">
                <thead className="card__tablehead">
                  <tr>
                    <th>File Number</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="card__tablebody">
                  {this.state.client.projects.map((project, key) => {
                    return (
                      <tr key={key}>
                        <td>{project.fileNumber}</td>
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
              {JSON.parse(localStorage.getItem('user')).role.level >= 2 &&
                <Link 
                  to={{
                    pathname: `${this.props.location.match.url}/note`,
                    query: {name: this.state.client.name}
                  }}
                  className="btn btn--primary btn--small">
                  Add Note
                </Link>
              }
              </h2>
              <div className="card">
              {this.state.client.notes.map((note, key) => {
                return (
                  <div className="client-note" key={key}>
                    <span className="client-note__details">Posted by <b>{note.addedBy.name}</b> on <b>{moment(note.created).format('MMMM Do, YYYY')}</b></span>
                    <p>
                      {note.description}
                    </p>
                    {JSON.parse(localStorage.getItem('user')).role.level >= 2 &&
                      <button className="delete-small" onClick={() => {if (window.confirm('Are you sure you want to delete this note?')) {this.deleteNote(note._id)};}}>Delete <i className="fa fa-trash-o" aria-hidden="true"></i></button>
                    }
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