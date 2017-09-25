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
    this.getDollars = this.getDollars.bind(this);
    this.getUpdatedTotal = this.getUpdatedTotal.bind(this);
    this.renderCostUpdateButton = this.renderCostUpdateButton.bind(this);

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

  renderCostUpdateButton() {
    if (this.state.project.actualCost) {
      return (
        <Link 
          to={{
            pathname: `${this.props.location.match.url}/update`,
            query: {name: this.state.project.name}
          }}
          className="btn btn--primary btn--small">
          Add Update
        </Link>
      );
    }
  }

  getDollars(cents) {
    const dollars = (cents/100).toFixed(2);
    let dollarString = dollars.toString().split('.');

    if (dollarString[0].length >= 4) {
      dollarString[0] = dollarString[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }

    return dollarString.join('.');
  }

  getUpdatedTotal(total) {
    let updatedTotal = total;
    const updates = this.state.project.updates;
    updates.forEach(ele => {
      if (ele.type === 'Addition') {
        updatedTotal += ele.amount;
      } else if (ele.type === 'Subtraction') {
        updatedTotal -= ele.amount;
      }
    });
    return this.getDollars(updatedTotal);
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

      // Cost breakdowns
      const labourCost = this.state.project.labourCost || false;
      const materialsCost = this.state.project.materialsCost || false;
      const actualCost = this.state.project.actualCost || false;
      let contractCost = false;
      let commission = -1;

      if (labourCost && materialsCost) {
        contractCost = (labourCost + materialsCost) * 2.1;
      }

      if (actualCost && contractCost) {
        let difference = actualCost - contractCost;
        if (difference > 0) {
          commission = difference;
        } else {
          commission = 0;
        }
      }

      const types = [];
      this.state.project.type.forEach(ele => {
        types.push(ele.name);
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
                  <li><b>Labour Cost:</b> {(labourCost) ? `$${this.getDollars(labourCost)}` : 'Not available'} / <b>Materials Cost:</b> {(materialsCost) ? `$${this.getDollars(materialsCost)}` : 'Not available'}</li>
                  <li><b>Contract Cost:</b> {(contractCost) ? `$${this.getDollars(contractCost)}` : 'Not available'} / <b>Actual Cost:</b> {(actualCost) ? `$${this.getUpdatedTotal(actualCost)}` : 'Not available'}</li>
                  <li><b>Commission:</b> {(commission !== -1) ? `$${this.getDollars(commission)}` : 'Not available'}</li>
                </ul>
                <div className="project-actions">
                  <Link to={{ pathname: `/projects/${this.props.location.match.params.id}/edit`, query: {project: this.state.project}}} className="btn btn--primary">Edit Project</Link>
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
              <h2 className="card-title">0 Project Photos <Link to="/projects" className="btn btn--primary btn--small">Add Photo</Link></h2>
              <div className="card">
                No photos currently added to this project.
              </div>
            </div>
          </div>
          <div className="row">
            <div className="md-6 column">
              <h2 className="card-title">2 Project Files <Link to="/projects" className="btn btn--primary btn--small">Add File</Link></h2>
              <div className="card">
                <div className="project-note">
                  <Link to="/projects">Some File Name</Link>  
                  <span className="project-note__details">Posted by <b>John Doe</b> on <b>January 1, 2017</b></span>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa dolores ipsum illum et libero, neque ducimus fugiat earum nobis quas.
                  </p>
                </div>
                <div className="project-note">
                  <Link to="/projects">Some File Name</Link>  
                  <span className="project-note__details">Posted by <b>John Doe</b> on <b>January 1, 2017</b></span>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa dolores ipsum illum et libero, neque ducimus fugiat earum nobis quas.
                  </p>
                </div>
              </div>
            </div>
            <div className="md-6 column">
              <h2 className="card-title">{this.state.project.notes.length} Project Note(s) 
                <Link 
                  to={{
                    pathname: `${this.props.location.match.url}/note`,
                    query: {name: this.state.project.name}
                  }}
                  className="btn btn--primary btn--small">
                  Add Note
                </Link>
              </h2>
              <div className="card">
              {this.state.project.notes.map((note, key) => {
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
          <div className="row">
            <div className="md-6 column">
              <h2 className="card-title">{this.state.project.updates.length} Cost Update(s)
                {this.renderCostUpdateButton()}
              </h2>
              <div className="card">
              {this.state.project.updates.map((update, key) => {
                return (
                  <div className="project-update">
                    <ul>
                      <li><b>Amount:</b> {`$${this.getDollars(update.amount)}`}</li>
                      <li><b>Reason:</b> {update.reason}</li>
                      <li><b>Type:</b> {update.type}</li>
                    </ul>
                  </div>
                );
              })}
              </div>
            </div>
            <div className="md-6 column">
              <h2 className="card-title">{this.state.project.products.length} Project Product(s) 
                <Link 
                  to={{
                    pathname: `${this.props.location.match.url}/product`,
                    query: {name: this.state.project.name}
                  }}
                  className="btn btn--primary btn--small">
                  Add Product
                </Link>
              </h2>
              <div className="card">
              {this.state.project.products.map((product, key) => {
                return (
                  <div className="project-product">
                    <ul>
                      <li><b>Name:</b> {product.name}</li>
                      <li><b>Brand:</b> {product.brand}</li>
                      <li><b>Colour:</b> {product.colour}</li>
                      <li><b>Style:</b> {product.style}</li>
                    </ul>
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