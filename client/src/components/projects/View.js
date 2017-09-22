import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';
import * as api from '../../api';

import Loading from '../Loading';
import Map from '../Map';

class View extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.getProject = this.getProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);

    // Initial state
    this.state = {
      project: null,
      redirect: null
    }
  }

  componentDidMount() {
    // Update tab
    this.props.setActiveSubtab(0);

    // Get client
    this.getProject(this.props.location.match.params.id);
  }

  getProject(id) {
    api.getProject(id).then(project => {
      this.setState({ project }, () => {
        // Set title
        document.title = `${this.state.project.name} | Renovaction`;
      })
    });
  }

  deleteProject() {
    const id = this.props.location.match.params.id;
    api.deleteProject(id).then(result => {
      if (result) {
        this.props.removeFromProjects(id);
        this.setState({
          redirect: '/projects/list'
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

    if (this.state.project) {
      const dates = {
        soldDate: moment(this.state.project.soldDate).format('MMMM DD, YYYY'),
        cashinDate: this.state.project.cashinDate || false,
        startDate: this.state.project.startDate || false,
        endDate: this.state.project.endDate || false,
      };

      const types = [];
      this.state.project.type.map(ele => {
        types.push(ele.name);
        return;
      });

      return (
        <div className="content">
          <div className="row">
            <div className="md-6 column">
              <h2 className="card-title">Project Overview</h2>
              <div className="card">
                <ul className="project-overview">
                  <li><b>Date Created:</b> {moment(this.state.project.created).format('MMMM DD, YYYY')}</li>
                  <li><b>Nickname:</b> {this.state.project.name}  <span className={`status status--${this.state.project.status.replace(/\s+/g, '').toLowerCase()}`}>{this.state.project.status}</span></li>
                  <li><b>Type:</b> {types.join(', ')}</li>
                  <li><b>Client:</b> <Link to={`/clients/${this.state.project.client._id}`}>{this.state.project.client.name}</Link></li>
                  <li><b>Sold Date:</b> {dates.soldDate} / <b>Cashin Date:</b> {(dates.cashinDate) ? moment(dates.cashinDate).format('MMMM DD, YYYY') : 'Not available'}</li>
                  <li><b>Start Date:</b> {(dates.startDate) ? moment(dates.startDate).format('MMMM DD, YYYY') : 'Not available'} / <b>End Date:</b> {(dates.endDate) ? moment(dates.endDate).format('MMMM DD, YYYY') : 'Not available'}</li>
                  <li><b>Labour Cost:</b> $5,000.00 / <b>Materials Cost:</b> $5,000.00</li>
                  <li><b>Contract Cost:</b> $5,000.00 / <b>Actual Cost:</b> $5,000.00</li>
                  <li><b>Commission:</b> $5,000.00</li>
                </ul>
                <div className="project-actions">
                  <Link to="/projects/list" className="btn btn--primary">Edit Project</Link>
                  <button className="btn btn--danger" onClick={() => {if (window.confirm('Are you sure you want to delete this project?')) {this.deleteProject()};}}>Delete Project</button>
                </div>
              </div>
            </div>
            <div className="md-6 column">
              <h2 className="card-title">Project Location</h2>
              <div className="card">
                <div id="map" className="project-map">
                  <Map google={window.google} lat={this.state.project.location.coordinates[1]} long={this.state.project.location.coordinates[0]} />
                </div>
                <div className="project-location">
                  <p>{this.state.project.street}<br/>{this.state.project.city}, ON <span className="capitalize">{this.state.project.postalCode}</span></p>
                  <a href={`https://www.google.com/maps?saddr=My+Location&daddr=${encodeURI(this.state.project.street)}+${this.state.project.city}`} target="_blank">Get Directions</a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <h2 className="card-title">0 Project Photos <a href="#" className="btn btn--primary btn--small">Add Photo</a></h2>
              <div className="card">
                No photos currently added to this project.
              </div>
            </div>
          </div>
          <div className="row">
            <div className="md-6 column">
              <h2 className="card-title">2 Project Files <a href="#" className="btn btn--primary btn--small">Add File</a></h2>
              <div className="card">
                <div className="project-note">
                  <a href="#">Some File Name</a>  
                  <span className="project-note__details">Posted by <b>John Doe</b> on <b>January 1, 2017</b></span>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa dolores ipsum illum et libero, neque ducimus fugiat earum nobis quas.
                  </p>
                </div>
                <div className="project-note">
                  <a href="#">Some File Name</a>  
                  <span className="project-note__details">Posted by <b>John Doe</b> on <b>January 1, 2017</b></span>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa dolores ipsum illum et libero, neque ducimus fugiat earum nobis quas.
                  </p>
                </div>
              </div>
            </div>
            <div className="md-6 column">
              <h2 className="card-title">2 Project Notes <a href="#" className="btn btn--primary btn--small">Add Note</a></h2>
              <div className="card">
                <div className="project-note">
                  <span className="project-note__details">Posted by <b>John Doe</b> on <b>January 1, 2017</b></span>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa dolores ipsum illum et libero, neque ducimus fugiat earum nobis quas.
                  </p>
                </div>
                <div className="project-note">
                  <span className="project-note__details">Posted by <b>John Doe</b> on <b>January 1, 2017</b></span>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa dolores ipsum illum et libero, neque ducimus fugiat earum nobis quas.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="md-6 column">
              <h2 className="card-title">2 Cost Updates <a href="#" className="btn btn--primary btn--small">Add Update</a></h2>
              <div className="card">
                <div className="project-update">
                  <ul>
                    <li><b>Amount:</b> $500</li>
                    <li><b>Reason:</b> Some reason here</li>
                    <li><b>Type:</b> Addition</li>
                  </ul>
                </div>
                <div className="project-update">
                  <ul>
                    <li><b>Amount:</b> $500</li>
                    <li><b>Reason:</b> Some reason here</li>
                    <li><b>Type:</b> Addition</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="md-6 column">
              <h2 className="card-title">2 Project Products <a href="#" className="btn btn--primary btn--small">Add Product</a></h2>
              <div className="card">
                <div className="project-product">
                  <ul>
                    <li><b>Name:</b> Something here</li>
                    <li><b>Brand:</b> Cool brand</li>
                    <li><b>Colour:</b> Aqua</li>
                    <li><b>Style:</b> Really cool</li>
                  </ul>
                </div>
                <div className="project-product">
                  <ul>
                    <li><b>Name:</b> Something here</li>
                    <li><b>Brand:</b> Cool brand</li>
                    <li><b>Colour:</b> Aqua</li>
                    <li><b>Style:</b> Really cool</li>
                  </ul>
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