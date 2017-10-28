import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import * as api from '../api';

// Import components
import Header from '../components/Header';
import Home from '../components/Home';
import Client from './Client';
import Project from './Project';
import User from './User';
import NoMatch from '../components/NoMatch';
import Login from './Login';

class App extends Component {
  constructor() {
    super();

    // Bind functions
    this.setActiveTab = this.setActiveTab.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.logout = this.logout.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);

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
    this.getCurrentUser();
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
  getCurrentUser() {
    api.getCurrentUser().then(result => {
        const user = result;
        this.setState({user});
    });
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
            <Route path="/users" render={() =>
              <User setActiveTab={this.setActiveTab}/>
            } />
            <Route component={NoMatch}/>
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="app">
          <Login />
        </div>
      );  
    }  
  }
}

export default App;
