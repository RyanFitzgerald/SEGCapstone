import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';
import * as api from '../../api';
import Gallery from './Gallery';
import Loading from '../Loading';
import {Marker} from 'google-maps-react';
import Map from '../Map';

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
    this.getUpdatedTotal = this.getUpdatedTotal.bind(this);
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
      project: this.props.location.match.params.id
    };
    api.deleteProjectNote(note).then(result => {
      if (result) {
        this.props.addNotification('Successfully deleted note!', 'success');
        this.getProject(this.props.location.match.params.id);
      }
    });
  }

  deleteUpdate(id) {
    const update = {
      id,
      project: this.props.location.match.params.id
    };
    api.deleteUpdate(update).then(result => {
      if (result) {
        this.props.addNotification('Successfully deleted cost update!', 'success');        
        this.getProject(this.props.location.match.params.id);
      }
    });
  }

  deletePhoto(id) {
    const photo = {
      id,
      project: this.props.location.match.params.id
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
      project: this.props.location.match.params.id
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
      project: this.props.location.match.params.id
    };
    api.deleteFile(file).then(result => {
      if (result) {
        this.props.addNotification('Successfully deleted file!', 'success');        
        this.getProject(this.props.location.match.params.id);
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
                  <li><b>Sold Date:</b> {dates.soldDate} &#8226; <b>Cashin Date:</b> {(dates.cashinDate) ? moment(dates.cashinDate).format('MMMM DD, YYYY') : 'Not available'}</li>
                  <li><b>Start Date:</b> {(dates.startDate) ? moment(dates.startDate).format('MMMM DD, YYYY') : 'Not available'} &#8226; <b>End Date:</b> {(dates.endDate) ? moment(dates.endDate).format('MMMM DD, YYYY') : 'Not available'}</li>
                  <li><b>Labour Cost:</b> {(labourCost) ? `$${this.getDollars(labourCost)}` : 'Not available'} &#8226; <b>Materials Cost:</b> {(materialsCost) ? `$${this.getDollars(materialsCost)}` : 'Not available'}</li>
                  <li><b>Contract Cost:</b> {(contractCost) ? `$${this.getDollars(contractCost)}` : 'Not available'} &#8226; <b>Actual Cost:</b> {(actualCost) ? `$${this.getUpdatedTotal(actualCost)}` : 'Not available'}</li>
                  <li><b>Commission:</b> {(commission !== -1) ? `$${this.getDollars(commission)}` : 'Not available'}</li>
                  <li><b>Added by:</b> {this.state.project.addedBy.name}</li>
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
                  <Map google={window.google} lat={this.state.project.location.coordinates[1]} long={this.state.project.location.coordinates[0]}>
                    <Marker 
                      title={this.state.project.name}
                      position={{lat: this.state.project.location.coordinates[1], lng: this.state.project.location.coordinates[0]}} 
                    />
                  </Map>
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
              <h2 className="card-title">{this.state.project.photos.length} Project Photo(s) 
              {this.props.checkLevel(JSON.parse(sessionStorage.getItem('user')).role.level, 2) &&
                <Link 
                  to={{
                    pathname: `${this.props.location.match.url}/photo`,
                    query: {name: this.state.project.name}
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
                caption: `${photo.name} - ${photo.description}`,
                orientation: 'landscape',
                useForDemo: true
              }))} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="md-6 column">
              <h2 className="card-title">{this.state.project.updates.length} Cost Update(s)
              {this.props.checkLevel(JSON.parse(sessionStorage.getItem('user')).role.level, 2) &&
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
                    <button className="delete-small" onClick={() => {if (window.confirm('Are you sure you want to delete this update?')) {this.deleteUpdate(update._id)};}}>Delete <i className="fa fa-trash-o" aria-hidden="true"></i></button>
                  </div>
                );
              })}
              </div>
            </div>
            <div className="md-6 column">
              <h2 className="card-title">{this.state.project.products.length} Project Product(s)
                {this.props.checkLevel(JSON.parse(sessionStorage.getItem('user')).role.level, 2) &&
                <Link 
                  to={{
                    pathname: `${this.props.location.match.url}/product`,
                    query: {name: this.state.project.name}
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
                    <button className="delete-small" onClick={() => {if (window.confirm('Are you sure you want to delete this product?')) {this.deleteProduct(product._id)};}}>Delete <i className="fa fa-trash-o" aria-hidden="true"></i></button>
                  </div>
                );
              })}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="md-6 column">
              <h2 className="card-title">{this.state.project.files.length} Project File(s)
              {this.props.checkLevel(JSON.parse(sessionStorage.getItem('user')).role.level, 2) &&
                <Link 
                  to={{
                    pathname: `${this.props.location.match.url}/file`,
                    query: {name: this.state.project.name}
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
                      <span className="project-note__details">Posted by <b>John Doe</b> on <b>{moment(file.created).format('MMMM Do, YYYY')}</b></span>
                      <p>{file.description}</p>
                      <button className="delete-small" onClick={() => {if (window.confirm('Are you sure you want to delete this file?')) {this.deleteFile(file._id)};}}>Delete <i className="fa fa-trash-o" aria-hidden="true"></i></button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="md-6 column">
              <h2 className="card-title">{this.state.project.notes.length} Project Note(s) 
              {this.props.checkLevel(JSON.parse(sessionStorage.getItem('user')).role.level, 2) &&
                <Link 
                  to={{
                    pathname: `${this.props.location.match.url}/note`,
                    query: {name: this.state.project.name}
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
                    <span className="project-note__details">Posted by <b>John Doe</b> on <b>{moment(note.created).format('MMMM Do, YYYY')}</b></span>
                    <p>
                      {note.description}
                    </p>
                    <button className="delete-small" onClick={() => {if (window.confirm('Are you sure you want to delete this note?')) {this.deleteNote(note._id)};}}>Delete <i className="fa fa-trash-o" aria-hidden="true"></i></button>
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