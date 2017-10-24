import React from 'react';
import Logo from '../logo.png';

class Login extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleSubmit = this.handleSubmit.bind(this);

    // Set state
    this.state = {
      redirect: false
    }
  }

  handleSubmit(e) {
    // Stop form submission
    e.preventDefault();

    // TO DO
    // Call Passport using API to login and then redirect them by
    // rendering Redirect prop from react router
  }

  render() {
    return (
      <div className="login card">
        <img src={Logo} alt="Renovaction" />
        <form onSubmit={this.handleSubmit}>
          <input className="form-text" ref={input => this.username = input} type="text" placeholder="Email" />
          <input className="form-text" type="password" ref={input => this.password = input} placeholder="Password" />
          <input className="btn btn--primary btn--small" type="submit" value="Login"/>
        </form>
      </div>
    );
  }
}

export default Login;