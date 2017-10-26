import React from 'react';
import Logo from '../logo.png';
import { Redirect } from 'react-router-dom';
import * as api from '../api';

class AddUser extends React.Component {
  constructor() {
    super();

    // Bind functions
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addUser = this.addUser.bind(this);

    // Set state
    this.state = {
      redirect: false
    }
  }

  componentDidMount() {
    // Set title
    document.title = 'Add User | Renovaction';

    // Update active tab
    this.props.setActiveTab(1);
  }

  handleSubmit(e) {
    // Stop form submission
    e.preventDefault();

    // Get form data
    const user = {
			email: this.username.value,
			name: this.name.value,
			password: this.password.value
		};
		
		this.addUser(user);
  }

  addUser(user) {
    api.addUser(user).then(
      // Redirect
      this.setState({
        redirect: `/projects`
      })
    );
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
          <input className="form-text" required ref={input => this.username = input} type="email" placeholder="Email" />
          <input className="form-text" required ref={input => this.name = input} type="text" placeholder="Name" />
          <input className="form-text" required  ref={input => this.password = input} type="password" placeholder="Password" />
          <input className="btn btn--primary btn--small" type="submit" value="Add User"/>
        </form>
      </div>
    );
  }
}

export default AddUser;