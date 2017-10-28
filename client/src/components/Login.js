import React from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../logo.png';
import * as api from '../api';
import LoadingGif from '../loading.gif';

class Login extends React.Component {
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
    this.setState({loading:true});
    // Attempt to validate user credentials for login
    this.login(userCredentials);
  }

  // Reload Login component on login attempt
  loginAttempt() {
    window.location.reload();
  }

  login(userCredentials) {
    api.login(userCredentials).then(isFailedLogin =>{
        if(!isFailedLogin) {
          this.props.failedLogin(true);
          this.props.addNotification('Wrong user name or password!', 'error');
          this.setState({
            redirect: `/`
          });
        }
        else {
          this.loginAttempt();
        }
      }
    );
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={this.state.redirect}/>
      );
    }

    let loadIcon = <div></div>;
    if(this.state.loading) {
      loadIcon = <div className="loading"><img src={LoadingGif} alt="Loading..."/></div>;
    }

    return (
      <div className="login card">
        <img src={Logo} alt="Renovaction" />
        <form onSubmit={this.handleSubmit}>
          <input className="form-text" ref={input => this.email = input} type="text" placeholder="Email" />
          <input className="form-text" type="password" ref={input => this.password = input} placeholder="Password" />
          <input className="btn btn--primary btn--small" type="submit" value="Login"/>
        </form>
        {loadIcon}
      </div>
    );
  }
}

export default Login;