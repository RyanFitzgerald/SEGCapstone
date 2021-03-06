import React from 'react';
import { Redirect } from 'react-router-dom';
import * as api from '../../api';

class Photo extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addPhoto = this.addPhoto.bind(this);

    // Set state
    this.state = {
      redirect: null,
      formError: false
    };
  }

  componentDidMount() {
    // Update tab
    this.props.setActiveSubtab(0);

    // Set title
    document.title = 'Add Photo | Renovaction';
  }

  handleSubmit(e) {
    // Stop form submission
    e.preventDefault();

    // Get form data
    const photo = {
      name: this.name.value,
      description: this.description.value,
      photo: this.photo.files[0],
      project: this.props.location.match.params.id,
      addedBy: JSON.parse(localStorage.getItem('user'))._id,
      access_token: JSON.parse(localStorage.getItem('user')).access_token
    };

    // Call api
    this.addPhoto(photo);
  }

  addPhoto(photo) {
    api.addPhoto(photo).then(resp => {
      if (resp.error) {
        this.setState({
          formError: 'There was an error when submitting the form, please try again.'
        })
        return;
      }

      this.setState({
        redirect: {
          location: `/projects/${this.props.location.match.params.id}`,
          message: 'Successfully added photo!',
          type: 'success'
        }
      });      
    });
  }
  
  render() {
    const id = this.props.location.match.params.id;
    let fileNumber = false;
    if (this.props.location.location && this.props.location.location.query) {
      fileNumber = this.props.location.location.query.fileNumber;
    }

    if (this.state.redirect) {
      this.props.addNotification(this.state.redirect.message, this.state.redirect.type);
      return (
        <Redirect to={this.state.redirect.location} />
      );
    }
    
    if (id && fileNumber) {
      return (
        <div className="content">
          <div className="row">
            <div className="column">
              <h2 className="card-title">Add Photo For <b>{fileNumber}</b></h2>
              <div className="card">
              {this.props.renderError(this.state.formError)}
                <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                <div className="row">
                  <div className="md-4 column form-section__title no-left">
                    <h3>Photo</h3>
                    <p>
                      Photos can be accessed on the individual project's page after upload
                    </p>
                  </div>
                  <div className="md-8 column no-right">
                    <label className="form-label" htmlFor="name">Name <span className="form-required">*</span></label>
                    <input name="name" ref={input => this.name = input} className="form-text form-text--full" type="text" required/>
                    <label className="form-label" htmlFor="upload">Photo <span className="form-required">*</span></label>
                    <input className="form-text form-text--full" name="upload" ref={input => this.photo = input} type="file" required/>
                    <label className="form-label" htmlFor="description">Description</label>
                    <textarea name="description" ref={input => this.description = input} className="form-textarea"></textarea>
                  </div>
                  <div className="text-center">
                    <input type="submit" className="btn btn--primary btn--large" value="Add Photo" />
                  </div>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <Redirect to="/projects"/>
    );
  }
}

export default Photo;