import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as api from '../../api';

import Loading from '../Loading';

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
                  <li><b>Date Created:</b> January 1, 2017</li>
                  <li><b>Name:</b> {this.state.client.name}</li>
                  <li><b>Email:</b> <a href={'mailto:' + this.state.client.email}>{this.state.client.email}</a></li>
                  <li><b>Telephone:</b> <a href={'tel:' + this.state.client.telephone}>{this.state.client.telephone}</a></li>
                  <li><b>Sold by:</b> Joseph Doe</li>
                </ul>
                <div className="client-actions">
                  <Link to="/" className="btn btn--primary">Edit Client</Link>
                  <button className="btn btn--danger" onClick={() => {if (window.confirm('Are you sure you want to delete this client?')) {this.deleteClient()};}}>Delete Client</button>
                </div>
              </div>
            </div>
            <div className="md-6 column">
              <h2 className="card-title">Client Location</h2>
              <div className="card">
                <div id="map" className="client-map">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d359539.2053292122!2d-76.08043360352762!3d45.24981404523765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce05b25f5113af%3A0x8a6a51e131dd15ed!2sOttawa%2C+ON!5e0!3m2!1sen!2sca!4v1505169853591" width="500" height="500" frameBorder="0" style={{"border":0}} allowFullScreen></iframe>
                </div>
                <div className="client-location">
                  <p>{this.state.client.street}<br/>{this.state.client.city}, ON {this.state.client.postalCode}</p>
                  <a href="#">Get Directions</a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="md-6 column">
              <h2 className="card-title">3 Client Projects <a href="#" className="btn btn--primary btn--small">Add Project</a></h2>
              <div className="card">
              <table className="card__table">
                <thead className="card__tablehead">
                  <tr>
                    <th>Type(s)</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="card__tablebody">
                  <tr>
                    <td>Roofing</td>
                    <td><span className="status status--inprogress">In Progress</span></td>             
                    <td><a href="#" className="btn btn--small btn--primary">View Project</a></td>
                  </tr>
                  <tr>
                    <td>Roofing, Windows</td>
                    <td><span className="status status--complete">Complete</span></td>
                    <td><a href="#" className="btn btn--small btn--primary">View Project</a></td>
                  </tr>
                  <tr>
                    <td>Roofing</td>
                    <td><span className="status status--notstarted">Not Started</span></td>
                    <td><a href="#" className="btn btn--small btn--primary">View Project</a></td>
                  </tr>
                </tbody> 
              </table>
              </div>
            </div>
            <div className="md-6 column">
              <h2 className="card-title">1 Client Note 
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
              <div className="client-note">
                <span className="client-note__details">Posted by <b>John Doe</b> on <b>January 1, 2017</b></span>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa dolores ipsum illum et libero, neque ducimus fugiat earum nobis quas.
                </p>
              </div>
              <div className="client-note">
                <span className="client-note__details">Posted by <b>John Doe</b> on <b>January 1, 2017</b></span>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa dolores ipsum illum et libero, neque ducimus fugiat earum nobis quas.
                </p>
              </div>
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