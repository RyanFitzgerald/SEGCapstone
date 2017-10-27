import React from 'react';
import Logo from '../../logo.png';
import { Redirect } from 'react-router-dom';
import * as api from '../../api';

class Add extends React.Component {
  constructor() {
    super();

    // Bind functions
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addUser = this.addUser.bind(this);

    // Set state
    this.state = {
      redirect: false,
      formError: false
    }
  }

  componentDidMount() {
    // Set title
    document.title = 'Add User | Renovaction';

    // Update active tab
    this.props.setActiveSubtab(2);
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
    api.addUser(user).then(resp => {
      if (resp.status === 500) {
        this.setState({
          formError: 'There was an error when submitting the form, please try again.'
        })
        return;
      }
      // Append id
      //user._id = resp;

      // Update parent state
      this.props.addToUsers(user);

      // Redirect
      this.setState({
        redirect: `/users`
      });
    });
  }

  render() {
		if (this.state.redirect) {
      this.props.addNotification('Successfully added user!', 'success');
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

export default Add;