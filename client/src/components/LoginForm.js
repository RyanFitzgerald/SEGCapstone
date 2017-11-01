import React from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../logo.png';
import * as api from '../api';

class LoginForm extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleSubmit = this.handleSubmit.bind(this);

    // Set state
    this.state = {
      redirect: false,
      loading: false
    }
  }

  handleSubmit(e) {
    // Stop form submission
    e.preventDefault();

    // Retrieve user credentials from form
    const userCredentials = {
      email: this.email.value,
      password: this.password.value
    };

    // Attempt to validate user credentials for login
    this.login(userCredentials);
  }

  // Reload Login component on login attempt
  loginAttempt() {
    window.location.reload();
  }

  login(userCredentials) {
    api.login(userCredentials).then(result => {
      // If user failed to login, prep notification, and redirect to re-render this component
      if (!result) {
        this.props.addNotification('Wrong email or password!', 'error');
        return;
      }

      const user = result.user;
      user.access_token = result.access.token;
      user.token_expiry = result.access.expires;

      // Send user
      this.props.loggedIn(user);
    });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={this.state.redirect}/>
      );
    }

    return (
      <div className="login card">
        <img src={Logo} alt="Renovaction" />
        <form onSubmit={this.handleSubmit}>
          <input className="form-text" ref={input => this.email = input} type="text" placeholder="Email" />
          <input className="form-text" type="password" ref={input => this.password = input} placeholder="Password" />
          <input className="btn btn--primary btn--small" type="submit" value="Login"/>
        </form>
      </div>
    );
  }
}

export default LoginForm;