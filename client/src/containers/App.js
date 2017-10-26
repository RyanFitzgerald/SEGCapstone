import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import * as api from '../api';

// Import components
import Header from '../components/Header';
import Home from '../components/Home';
import Client from './Client';
import Project from './Project';
import NoMatch from '../components/NoMatch';
import Login from '../components/Login';
import AddUser from '../components/AddUser'

class App extends Component {
  constructor() {
    super();

    // Bind functions
    this.setActiveTab = this.setActiveTab.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
    this.loginAttempt = this.loginAttempt.bind(this);

    // Set state defaults
    this.state = {
      activeTab: 1,
      isLoggedIn: false,
      user: false
    };
  }

  setActiveTab(tab) {
    this.setState({activeTab: tab});
  }

  componentDidMount() {
    this.isLoggedIn();

    // TODO get user only when logged in
    this.getUser();
  }

  isLoggedIn() {
    api.isLoggedIn().then(result => {
      const isLoggedIn = result;
      this.setState({isLoggedIn});
    });
  }

  logout() {
    api.logout().then(
      window.location.reload()
    );
  }

  // Retrieve user information
  getUser() {
    api.getUser().then(result => {
        const user = result;
        this.setState({user});
    });
  }

  // Reload App container on login attempt
  loginAttempt() {
    window.location.reload();
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div className="app">
          <Header user={this.state.user} logout={this.logout} activeTab={this.state.activeTab}/>
  
          <Switch>
            <Route exact path="/" render={() =>
              <Home setActiveTab={this.setActiveTab}/>
            } />
            <Route path="/clients" render={() =>
              <Client setActiveTab={this.setActiveTab}/>
            } />
            <Route path="/projects" render={() =>
              <Project setActiveTab={this.setActiveTab}/>
            } />
            <Route path="/users/add" render={() =>
              <AddUser setActiveTab={this.setActiveTab}/>
            } />
            <Route component={NoMatch}/>
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="app">
          <Login loginAttempt={this.loginAttempt} setActiveTab={this.setActiveTab}/>
        </div>
      );  
    }  
  }
}

export default App;
