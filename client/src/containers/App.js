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
import Stats from './Stats';
import Settings from './Settings';
import Account from './Account';
import LoginForm from '../components/LoginForm';

class App extends Component {
  constructor() {
    super();

    // Bind functions
    this.setActiveTab = this.setActiveTab.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.logout = this.logout.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.loggedIn = this.loggedIn.bind(this);

    // Set state defaults
    this.state = {
      activeTab: 1,
      isLoggedIn: false
    };
  }

  setActiveTab(tab) {
    this.setState({activeTab: tab});
  }

  componentDidMount() {
    this.isLoggedIn();
  }

  addNotification(message, type) {
    toast(message, { type });
  }

  isLoggedIn() {
    api.isLoggedIn().then(isLoggedIn => {
      this.setState({ isLoggedIn });
    });
  }

  loggedIn(user) {
    sessionStorage.setItem('user', JSON.stringify(user));

    this.setState({
      isLoggedIn: true
    });
  }

  logout() {
    api.logout().then(() => {
      sessionStorage.removeItem('user');
      window.location.reload();
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
          <Header logout={this.logout} activeTab={this.state.activeTab} />
  
          <Switch>
            <Route exact path="/" render={() =>
              <Home setActiveTab={this.setActiveTab}/>
            } />
            <Route path="/clients" render={() =>
              <Client setActiveTab={this.setActiveTab} addNotification={this.addNotification} />
            } />
            <Route path="/projects" render={() =>
              <Project setActiveTab={this.setActiveTab} addNotification={this.addNotification} />
            } />
            <Route path="/stats" render={() =>
              <Stats setActiveTab={this.setActiveTab} addNotification={this.addNotification} />
            } />
            <Route path="/settings" render={() =>
              <Settings setActiveTab={this.setActiveTab} addNotification={this.addNotification} />
            } />
            <Route path="/account" render={() =>
              <Account addNotification={this.addNotification} />
            } />
            {/* Already logged-in so redirect to root path */}
            <Route path="/login" render={() =>
              <Redirect to='/'/>
            } />
            <Route component={NoMatch}/>
          </Switch>
        </div>
      );
    }

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

        <Switch>
          <Route path="/login" render={() =>
            <LoginForm addNotification={this.addNotification} loggedIn={this.loggedIn} />
          }/>
          <Route render={() =>
            <Redirect to='/login'/>
          }/>
        </Switch>
      </div>
    );   
  }
}

export default App;