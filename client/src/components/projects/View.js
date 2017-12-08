import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';
import * as api from '../../api';
import Gallery from './Gallery';
import Loading from '../Loading';
import {Marker} from 'react-google-maps';
import Map from '../Map';

import { mapAPIKey } from '../../config';

class View extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.getProject = this.getProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.deleteUpdate = this.deleteUpdate.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.getDollars = this.getDollars.bind(this);
    this.renderCostUpdateButton = this.renderCostUpdateButton.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);

    // Initial state
    this.state = {
      project: null,
      lightboxIsOpen: false,
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
    const query = {
      id,
      access_token: JSON.parse(localStorage.getItem('user')).access_token
    }

    api.getProject(query).then(project => {
      this.setState({ project }, () => {
        // Set title
        document.title = `${this.state.project.fileNumber} | Renovaction`;
      })
    });
  }

  deleteProject() {
    const query = {
      id: this.props.location.match.params.id,
      access_token: JSON.parse(localStorage.getItem('user')).access_token
    }

    api.deleteProject(query).then(result => {
      if (result) {
        this.props.removeFromProjects(query.id);
        this.props.addNotification('Successfully deleted project!', 'success');        
        this.setState({
          redirect: '/projects'
        });
      }
    });
  }

  deleteNote(id) {
    const note = {
      id,
      project: this.props.location.match.params.id,
      access_token: JSON.parse(localStorage.getItem('user')).access_token
    };

    api.deleteProjectNote(note).then(result => {
      if (result) {
        this.props.addNotification('Successfully deleted note!', 'success');
        this.getProject(this.props.location.match.params.id);
      }
    });
  }

  deleteUpdate(updateObj) {
    const update = {
      id: updateObj._id,
      project: this.props.location.match.params.id,
      access_token: JSON.parse(localStorage.getItem('user')).access_token
    };

    api.deleteUpdate(update).then(result => {
      if (result) {
        this.props.addNotification('Successfully deleted cost update!', 'success');

        let contractCost = this.state.project.contractCost;

        if (updateObj.type === 'Addition') {
          contractCost = contractCost - updateObj.amount;
        } else {
          contractCost = contractCost + updateObj.amount;
        }
  
        const project = {
          contractCost,
          access_token: JSON.parse(localStorage.getItem('user')).access_token
        }
  
        api.updateProject(project, this.props.location.match.params.id).then(resp => {
          if (resp.status === 500) {
            return;
          }
    
          // Update parent state
          this.getProject(this.props.location.match.params.id);
        });   
      }
    });
  }

  deletePhoto(id) {
    const photo = {
      id,
      project: this.props.location.match.params.id,
      access_token: JSON.parse(localStorage.getItem('user')).access_token
    };

    api.deletePhoto(photo).then(result => {
      if (result) {
        this.props.addNotification('Successfully deleted photo!', 'success');        
        this.getProject(this.props.location.match.params.id);
      }
    });
  }

  deleteProduct(id) {
    const product = {
      id,
      project: this.props.location.match.params.id,
      access_token: JSON.parse(localStorage.getItem('user')).access_token
    };

    api.deleteProduct(product).then(result => {
      if (result) {
        this.props.addNotification('Successfully deleted product!', 'success');        
        this.getProject(this.props.location.match.params.id);
      }
    });
  }

  deleteFile(id) {
    const file = {
      id,
      project: this.props.location.match.params.id,
      access_token: JSON.parse(localStorage.getItem('user')).access_token
    };
    api.deleteFile(file).then(result => {
      if (result) {
        this.props.addNotification('Successfully deleted file!', 'success');        
        this.getProject(this.props.location.match.params.id);
      }
    });
  }

  renderCostUpdateButton() {
    if (this.state.project.salesPrice) {
      return (
        <Link 
          to={{
            pathname: `${this.props.location.match.url}/update`,
            query: {
              fileNumber: this.state.project.fileNumber,
              contractCost: this.state.project.contractCost
            }
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

  closeLightbox () {
		this.setState({
			lightboxIsOpen: false
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

      // Cost breakdowns
      const labourCost = this.state.project.labourCost || false;
      const materialsCost = this.state.project.materialsCost || false;
      const par = this.state.project.par || false;
      const salesPrice = this.state.project.salesPrice || false;
      let commission = -1;

      // Check for commission
      if (par && salesPrice) {
        let difference = salesPrice - par;
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
                  <li><b>File Number:</b> {this.state.project.fileNumber}</li>
                  <li><b>Status:</b> <span className={`status status--${this.state.project.status.replace(/\s+/g, '').toLowerCase()}`}>{this.state.project.status}</span></li>
                  <li><b>Type:</b> {types.join(', ')}</li>
                  <li><b>Client:</b> <Link to={`/clients/${this.state.project.client._id}`}>{this.state.project.client.firstName} {this.state.project.client.lastName}</Link></li>
                  <li><b>Sold Date:</b> {dates.soldDate} <span className="project-overview--divider">&#8226;</span> <b>Cashin Date:</b> {(dates.cashinDate) ? moment(dates.cashinDate).format('MMMM DD, YYYY') : 'Not available'}</li>
                  <li><b>Start Date:</b> {(dates.startDate) ? moment(dates.startDate).format('MMMM DD, YYYY') : 'Not available'} <span className="project-overview--divider">&#8226;</span> <b>End Date:</b> {(dates.endDate) ? moment(dates.endDate).format('MMMM DD, YYYY') : 'Not available'}</li>
                  <li><b>Labour Cost:</b> {(labourCost) ? `$${this.getDollars(labourCost)}` : 'Not available'} <span className="project-overview--divider">&#8226;</span> <b>Materials Cost:</b> {(materialsCost) ? `$${this.getDollars(materialsCost)}` : 'Not available'}</li>
                  <li><b>Cost Total:</b> {(labourCost && materialsCost) ? `$${this.getDollars(labourCost + materialsCost)}` : 'Not available'} <span className="project-overview--divider">&#8226;</span> <b>PAR:</b> {(par) ? `$${this.getDollars(par)}` : 'Not available'}</li>
                  <li><b>Sales Price:</b> {(salesPrice) ? `$${this.getDollars(salesPrice)}` : 'Not available'} <span className="project-overview--divider">&#8226;</span> <b>Commission:</b> {(commission !== -1) ? `$${this.getDollars(commission)} (${((commission / salesPrice)*100).toFixed(2)}%)` : 'Not available'}</li>
                  <li><b>Added by:</b> {this.state.project.addedBy.name}</li>
                </ul>
                <div className="project-actions">
                {JSON.parse(localStorage.getItem('user')).role.level >= 2 && this.state.project.status !== 'Complete' &&
                  <Link to={{ pathname: `/projects/${this.props.location.match.params.id}/edit`, query: {project: this.state.project}}} className="btn btn--primary">Edit Project</Link>
                }
                {JSON.parse(localStorage.getItem('user')).role.level >= 2 && this.state.project.status !== 'Complete' &&
                  <button className="btn btn--danger" onClick={() => {if (window.confirm('Are you sure you want to delete this project?')) {this.deleteProject()};}}>Delete Project</button>
                }
                </div>
              </div>
            </div>
            <div className="md-6 column">
              <h2 className="card-title">Project Location</h2>
              <div className="card">
                <div id="map" className="project-map">
                  <Map
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${mapAPIKey}`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  >
                    <Marker 
                      title={this.state.project.name}
                      position={{lat: this.state.project.location.coordinates[1], lng: this.state.project.location.coordinates[0]}} 
                    />
                  </Map>
                </div>
                <div className="project-location">
                  <p>{this.state.project.houseNumber} {this.state.project.street}<br/>{this.state.project.city}, ON <span className="capitalize">{this.state.project.postalCode}</span></p>
                  <a href={`https://www.google.com/maps?saddr=My+Location&daddr=${encodeURI(this.state.project.houseNumber)}+${encodeURI(this.state.project.street)}+${this.state.project.city}`} target="_blank">Get Directions</a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <h2 className="card-title">{this.state.project.photos.length} Project Photo(s) 
              {JSON.parse(localStorage.getItem('user')).role.level >= 2 &&
                <Link 
                  to={{
                    pathname: `${this.props.location.match.url}/photo`,
                    query: {fileNumber: this.state.project.fileNumber}
                  }}
                  className="btn btn--primary btn--small">
                  Add Photo
                </Link>
              }
              </h2>
              <div className="card">
              <Gallery images={this.state.project.photos.map((photo, key) => ({
                src: `../../uploads/photos/${photo.photo}`,
                thumbnail: `../../uploads/photos/${photo.thumb}`,
                caption: `${photo.name} - ${photo.description} - Added by ${photo.addedBy.name}`,
                orientation: 'landscape',
                useForDemo: true
              }))} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="md-6 column">
              <h2 className="card-title">{this.state.project.updates.length} Price Update(s)
              {JSON.parse(localStorage.getItem('user')).role.level >= 2 && this.state.project.status !== 'Complete' &&
                this.renderCostUpdateButton()
              }
              </h2>
              <div className="card">
              {this.state.project.updates.map((update, key) => {
                return (
                  <div key={key} className="project-update">
                    <ul>
                      <li><b>Amount:</b> {`$${this.getDollars(update.amount)}`}</li>
                      <li><b>Reason:</b> {update.reason}</li>
                      <li><b>Type:</b> {update.type}</li>
                    </ul>
                    {JSON.parse(localStorage.getItem('user')).role.level >= 2 && this.state.project.status !== 'Complete' &&
                      <button className="delete-small" onClick={() => {if (window.confirm('Are you sure you want to delete this update?')) {this.deleteUpdate(update)};}}>Delete <i className="fa fa-trash-o" aria-hidden="true"></i></button>
                    }
                  </div>
                );
              })}
              </div>
            </div>
            <div className="md-6 column">
              <h2 className="card-title">{this.state.project.products.length} Project Product(s)
                {JSON.parse(localStorage.getItem('user')).role.level >= 2 &&
                <Link 
                  to={{
                    pathname: `${this.props.location.match.url}/product`,
                    query: {fileNumber: this.state.project.fileNumber}
                  }}
                  className="btn btn--primary btn--small">
                  Add Product
                </Link>
                }
              </h2>
              <div className="card">
              {this.state.project.products.map((product, key) => {
                return (
                  <div key={key} className="project-product">
                    <ul>
                      <li><b>Name:</b> {product.name}</li>
                      <li><b>Brand:</b> {product.brand}</li>
                      <li><b>Colour:</b> {product.colour}</li>
                      <li><b>Style:</b> {product.style}</li>
                    </ul>
                    {JSON.parse(localStorage.getItem('user')).role.level >= 2 && this.state.project.status !== 'Complete' &&
                      <button className="delete-small" onClick={() => {if (window.confirm('Are you sure you want to delete this product?')) {this.deleteProduct(product._id)};}}>Delete <i className="fa fa-trash-o" aria-hidden="true"></i></button>
                    }
                  </div>
                );
              })}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="md-6 column">
              <h2 className="card-title">{this.state.project.files.length} Project File(s)
              {JSON.parse(localStorage.getItem('user')).role.level >= 2 &&
                <Link 
                  to={{
                    pathname: `${this.props.location.match.url}/file`,
                    query: {fileNumber: this.state.project.fileNumber}
                  }}
                  className="btn btn--primary btn--small">
                  Add File
                </Link>
              }
              </h2>
              <div className="card">
                {this.state.project.files.map((file, key) => {
                  return (
                    <div key={key} className="project-note">
                      <a href={`../../uploads/files/${file.file}`} download>{file.name}</a>  
                      <span className="project-note__details">Posted by <b>{file.addedBy.name}</b> on <b>{moment(file.created).format('MMMM Do, YYYY')}</b></span>
                      <p>{file.description}</p>
                      {JSON.parse(localStorage.getItem('user')).role.level >= 2 && this.state.project.status !== 'Complete' &&
                        <button className="delete-small" onClick={() => {if (window.confirm('Are you sure you want to delete this file?')) {this.deleteFile(file._id)};}}>Delete <i className="fa fa-trash-o" aria-hidden="true"></i></button>
                      }
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="md-6 column">
              <h2 className="card-title">{this.state.project.notes.length} Project Note(s) 
              {JSON.parse(localStorage.getItem('user')).role.level >= 2 &&
                <Link 
                  to={{
                    pathname: `${this.props.location.match.url}/note`,
                    query: {fileNumber: this.state.project.fileNumber}
                  }}
                  className="btn btn--primary btn--small">
                  Add Note
                </Link>
              }
              </h2>
              <div className="card">
              {this.state.project.notes.map((note, key) => {
                return (
                  <div className="project-note" key={key}>
                    <span className="project-note__details">Posted by <b>{note.addedBy.name}</b> on <b>{moment(note.created).format('MMMM Do, YYYY')}</b></span>
                    <p>
                      {note.description}
                    </p>
                    {JSON.parse(localStorage.getItem('user')).role.level >= 2 && this.state.project.status !== 'Complete' &&
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