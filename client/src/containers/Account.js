import React from 'react';
import { Redirect } from 'react-router-dom';
import * as api from '../api';

import Loading from '../components/Loading';

class Account extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUser = this.updateUser.bind(this);

    // Set state
    this.state = {
      user: null,
      redirect: false
    }
  }

  componentDidMount() {
    // Set title
    document.title = 'Account | Renovaction';

    const user = JSON.parse(sessionStorage.getItem('user'));
    this.setState({ user });
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

  updateUser(user) {
    api.updateUser(user, this.state.user._id).then(resp => {
      if (resp.status === 500) {
        this.setState({
          formError: 'There was an error when submitting the form, please try again.'
        })
        return;
      }

      // Update session storage
      const sessionUser = JSON.parse(sessionStorage.getItem('user'));
      sessionUser.name = user.name;
      sessionUser.email = user.email;
      sessionStorage.removeItem('user');
      sessionStorage.setItem('user', JSON.stringify(sessionUser));

      // Redirect
      this.setState({
        redirect: {
          location: '/',
          message: 'Successfully updated account!',
          type: 'success'
        }
      });
    });
  }

  render() {
    if (this.state.redirect) {
      this.props.addNotification(this.state.redirect.message, this.state.redirect.type);
      return (
        <Redirect to={this.state.redirect.location}/>
      );
    }

    if (!this.state.user) {
      return (
        <Loading/>
      );
    }

    return (
      <div className="content">
      <div className="row">
        <div className="column">
          <h2 className="card-title">Edit Account Settings</h2>
          <div className="card">
            {/*this.props.renderError(this.state.formError)*/}
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="md-4 column form-section__title no-left">
                  <h3>Account Settings</h3>
                  <p>
                    Edit settings for your account
                  </p>
                </div>
                <div className="md-8 column no-right">
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
}

export default Account;