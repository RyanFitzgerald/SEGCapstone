import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// Import components
import Header from '../components/Header';
import Home from '../components/Home';
import Client from './Client';
import Project from './Project';
import NoMatch from '../components/NoMatch';
import Login from '../components/Login';

class App extends Component {
  constructor() {
    super();

    // Bind functions
    this.setActiveTab = this.setActiveTab.bind(this);

    // Set state defaults
    this.state = {
      activeTab: 1,
      isLoggedIn: false
    };
  }

  setActiveTab(tab) {
    this.setState({activeTab: tab});
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div className="app">
          <Header activeTab={this.state.activeTab}/>
  
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
            <Route component={NoMatch}/>
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="app">
          <Login/>
        </div>
      );  
    }
    
  }
}

export default App;
