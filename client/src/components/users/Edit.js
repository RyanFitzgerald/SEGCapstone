import React from 'react';
import { Redirect } from 'react-router-dom';
import * as api from '../../api';

import Loading from '../Loading';

class Edit extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);

    // Set state
    this.state = {
      redirect: false,
      user: null,
      formError: false
    }
  }

  componentDidMount() {
    // Update tab
    this.props.setActiveSubtab(0);

    // Get user
    this.getUser(this.props.location.match.params.id);
  }

  handleSubmit(e) {
    // Stop form submission
    e.preventDefault();

    // Get form data
    const user = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value
    };

    // Call api
    this.updateUser(user);
  }

  getUser(id) {
    api.getUser(id).then(user => {
      this.setState({ user }, () => {
        // Set title
        document.title = `Edit ${this.state.user.name} | Renovaction`;
      })
    });
  }

  updateUser(user) {
    api.updateUser(user, this.props.location.match.params.id).then(resp => {
      if (resp.status === 500) {
        this.setState({
          formError: 'There was an error when submitting the form, please try again.'
        })
        return;
      }

      // Append id
      user._id = resp;

      // Update parent state
      this.props.updateUsers(user);

      // Redirect
      this.setState({
        redirect: `/users/${resp}`
      });
    });
  }

  render() {
    if (this.state.redirect) {
      this.props.addNotification('Successfully updated user!', 'success');      
      return (
        <Redirect to={this.state.redirect}/>
      );
    }

    if (this.state.user) {
      return (
        <div className="content">
          <div className="row">
            <div className="md-6 md-center column">
              <h2 className="card-title">Edit User</h2>
              <div className="card">
                {this.props.renderError(this.state.formError)}
                <form onSubmit={this.handleSubmit}>
                  <div className="row form-section">
                    <div className="md-12 column form-section__title no-left">
                      <h3>Basic Information</h3>
                      <p>
                        Enter all the basic information about this user
                      </p>
                    </div>
                    <div className="md-12 column no-right">
                      <label className="form-label" htmlFor="name"> Name <span className="form-required">*</span></label>
                      <input ref={input => this.name = input} name="name" className="form-text form-text--full" type="text" defaultValue={this.state.user.name} required />
                      <label className="form-label" htmlFor="email">Email <span className="form-required">*</span></label>
                      <input ref={input => this.email = input} name="email" className="form-text form-text--full" type="email" defaultValue={this.state.user.email} required/>
                      <label className="form-label" htmlFor="password">Password <span className="form-required">*</span></label>
                      <input ref={input => this.password = input} name="password" className="form-text form-text--full" type="password" placeholder="(keep same password)" />
                    </div>
                  </div>
                  <div className="text-center">
                      <input type="submit" className="btn btn--primary btn--large" value="Update User"/>
                  </div>
                </form>
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

export default Edit;