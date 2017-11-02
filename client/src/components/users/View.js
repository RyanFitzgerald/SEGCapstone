import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';
import * as api from '../../api';

import Loading from '../Loading';

class View extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.getUser = this.getUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    // Initial state
    this.state = {
      user: null,
      redirect: null
    }
  }

  componentDidMount() {
    // Update tab
    this.props.setActiveSubtab(0);

    // Get User
    this.getUser(this.props.location.match.params.id);
  }
  
  getUser(id) {
    const query = {
      id,
      access_token: JSON.parse(sessionStorage.getItem('user')).access_token
    }

    api.getUser(query).then(user => {
      this.setState({ user }, () => {
        // Set title
        document.title = `${this.state.user.name} | Renovaction`;
      })
    });
  }

  deleteUser() {
    const query = {
      id: this.props.location.match.params.id,
      access_token: JSON.parse(sessionStorage.getItem('user')).access_token
    }

    api.deleteUser(query).then(result => {
      if (result) {
        this.props.removeFromUsers(query.id);
        this.setState({
          redirect: {
            location: '/settings/users',
            message: 'Successfully deleted user!',
            type: 'success'
          }
        });
      } else {
        this.props.addNotification('A problem was encountered when trying to delete the client', 'warn');
      }
    });
  }
  
  render() {
    if (this.state.redirect) {
      this.props.addNotification(this.state.redirect.message, this.state.redirect.type);
      return (
        <Redirect to={this.state.redirect.location}/>
      );
    }

    if (this.state.user) {
      return (
        <div className="content">
          <div className="row">
            <div className="md-6 column md-center">
              <h2 className="card-title">User Overview</h2>
              <div className="card">
                <ul className="client-overview">
                  <li><b>Date Created:</b> {moment(this.state.user.created).format('MMMM Do, YYYY')}</li>
                  <li><b>Name:</b> {this.state.user.name}</li>
                  <li><b>Email:</b> <a href={'mailto:' + this.state.user.email}>{this.state.user.email}</a></li>
                  <li><b>Role:</b> {this.state.user.role.name}</li>
                </ul>
                <div className="client-actions">
                  <Link to={`/settings/users/${this.props.location.match.params.id}/edit`} className="btn btn--primary">Edit User</Link>
                  <button className="btn btn--danger" onClick={() => {if (window.confirm('Are you sure you want to delete this user?')) {this.deleteUser()};}}>Delete User</button>
                </div>
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