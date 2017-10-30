import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import * as api from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// Import components
import Header from '../components/Header';
import Home from '../components/Home';
import NoMatch from '../components/NoMatch';
import Client from './Client';
import Project from './Project';
import Settings from './Settings';
import Login from './Login';

class App extends Component {
  constructor() {
    super();

    // Bind functions
    this.setActiveTab = this.setActiveTab.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.logout = this.logout.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.checkLevel = this.checkLevel.bind(this);

    // Set state defaults
    this.state = {
      activeTab: 1,
      isLoggedIn: false,
      user: false,
      userLevel: false
    };
  }

  setActiveTab(tab) {
    this.setState({activeTab: tab});
  }

  componentDidMount() {
    this.isLoggedIn();

    this.getCurrentUser();
  }

  addNotification(message, type) {
    toast(message, { type });
  }

  isLoggedIn() {
    api.isLoggedIn().then(result => {
      const isLoggedIn = result;
      this.setState({ isLoggedIn });
    });
  }

  logout() {
    api.logout().then(
      window.location.reload()
    );
  }

  checkLevel(current, required) {
    return (current >= required);
  }

  // Retrieve user information
  getCurrentUser() {
    api.getCurrentUser().then(result => {
        const user = result;
        let userLevel = null;
        if (result.role) {
          userLevel = result.role.level;
        }
        
        this.setState({ user, userLevel });
    });
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div className="app">
          <ToastContainer 
            position="top-right"
            type="success"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnHover
          />
          <Header user={this.state.user} logout={this.logout} activeTab={this.state.activeTab}/>
  
          <Switch>
            <Route exact path="/" render={() =>
              <Home setActiveTab={this.setActiveTab}/>
            } />
            <Route path="/clients" render={() =>
              <Client setActiveTab={this.setActiveTab} addNotification={this.addNotification} level={this.state.userLevel} checkLevel={this.checkLevel}/>
            } />
            <Route path="/projects" render={() =>
              <Project setActiveTab={this.setActiveTab} addNotification={this.addNotification} level={this.state.userLevel} checkLevel={this.checkLevel}/>
            } />
            <Route path="/settings" render={() =>
              <Settings setActiveTab={this.setActiveTab} addNotification={this.addNotification} level={this.state.userLevel} checkLevel={this.checkLevel}/>
            } />
            {/* Already logged-in so redirect to root path */}
            <Route path="/login" render={() =>
              <Redirect to="/"/> 
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
