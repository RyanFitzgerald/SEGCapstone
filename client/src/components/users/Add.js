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
			email: this.email.value,
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
      user._id = resp;

      // Update parent state
      this.props.addToUsers(user);
      
      // TODO redirect to the user's profile
      // Redirect
      this.setState({
        redirect: `/users/${resp}`
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
      <div className="content">
        <div className="row">
          <div className="md-6 md-center column">
            <h2 className="card-title">Add New User</h2>
            <div className="card">
              {this.props.renderError(this.state.formError)}
              <form onSubmit={this.handleSubmit}>
                <div className="row form-section">
                  <div className="md-12  column form-section__title no-left">
                    <h3>Basic Information</h3>
                    <p>
                      Enter all the basic information about this user
                    </p>
                  </div>
                  <div className="md-12 column no-right">
                    <label className="form-label" htmlFor="name"> Name <span className="form-required">*</span></label>
                    <input ref={input => this.name = input} name="name" className="form-text form-text--full" type="text" placeholder="Name" required />
                    <label className="form-label" htmlFor="email">Email <span className="form-required">*</span></label>
                    <input ref={input => this.email = input} name="email" className="form-text form-text--full" type="email" placeholder="Email" required/>
                    <label className="form-label" htmlFor="password">Password <span className="form-required">*</span></label>
                    <input ref={input => this.password = input} name="password" className="form-text form-text--full" type="password" placeholder="Password" required/>
                  </div>
                </div>
                <div className="text-center">
                    <input type="submit" className="btn btn--primary btn--large" value="Add User"/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add;