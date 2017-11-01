import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as api from '../api';
import arraySort from 'array-sort';

// Import client components
import Submenu from '../components/clients/Submenu';
import Add from '../components/clients/Add';
import Edit from '../components/clients/Edit';
import Directory from '../components/clients/Directory';
import View from '../components/clients/View';
import Note from '../components/clients/Note';

class Client extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.setActiveSubtab = this.setActiveSubtab.bind(this);
    this.getClients = this.getClients.bind(this);
    this.addToClients = this.addToClients.bind(this);
    this.updateClients = this.updateClients.bind(this);
    this.removeFromClients = this.removeFromClients.bind(this);
    this.renderError = this.renderError.bind(this);
    this.sortByKey = this.sortByKey.bind(this);
    
    // State
    this.state = {
      activeSubtab: 1,
      clients: null,     
      sort: {
        name: null,
        email: null,
        city: null
      }
    };
  }

  componentDidMount() {
    // Set Page Title
    document.title = 'Clients Overview | Renovaction';

    // Update tab
    this.props.setActiveTab(3);

    // Get clients
    this.getClients();
  }

  setActiveSubtab(tab) {
    this.setState({activeSubtab: tab});
  }

  getClients(query) {
    api.getClients(query).then(result => {
      const clients = result;
      this.setState({ clients });
    });
  }

  addToClients(client) {
    const clients = [...this.state.clients];
    clients[this.state.clients.length] = client;
    this.setState({ clients });
  }

  removeFromClients(id) {
    const clients = [...this.state.clients];
    const updated = clients.filter(el => {
      return el._id !== id;
    });
    this.setState({ clients: updated });
  }

  updateClients(client) {
    const clients = [...this.state.clients];
    const key = Object.keys(clients).find(key => clients[key]._id === client._id);
    clients[key] = client;
    this.setState({ clients });
  }

  sortByKey(array, key) {
    let asc = 'asc';
    let desc = 'desc'
    let sortOrder = {name: null, email: null, city: null};
    const arr = Object.keys(array).map((k) => array[k]);
    var sortedArray = [];

    if (key === 'name') {
      if(this.state.sort.name === asc) {
        sortOrder.name = desc;
        sortedArray = arraySort(arr, key, {reverse: true});
      }
      else {
        sortOrder.name = asc;
        sortedArray = arraySort(arr, key);
      }
    }
    else if (key === 'email') {
      if(this.state.sort.email === asc) {
        sortOrder.email = desc;
        sortedArray = arraySort(arr, key, {reverse: true});
      }
      else {
        sortOrder.email = asc;
        sortedArray = arraySort(arr, key);;
      }
    }
    else if (key === 'city') {
      if(this.state.sort.city === asc) {
        sortOrder.city = desc;
        sortedArray = arraySort(arr, key, {reverse: true});
      }
      else {
        sortOrder.city = asc;
        sortedArray = arraySort(arr, key);;
      }
    }
    
    this.setState({clients: sortedArray, sort: sortOrder});
  }

  renderError(formError) {
    if (!formError) return;
    return (
      <div className="flash flash--warn">
        <p>{formError}</p>
      </div>
    );
  }

  render() {
    const level = JSON.parse(sessionStorage.getItem('user')).role.level;
    return (
      <div>
        <Submenu activeSubtab={this.state.activeSubtab} level={this.props.level} checkLevel={this.props.checkLevel}/>

        <Switch>
          <Route exact path="/clients" render={() =>
            <Directory setActiveSubtab={this.setActiveSubtab} clients={this.state.clients} getClients={this.getClients} sortByKey={this.sortByKey} />
          }/>
          <Route path="/clients/add" render={() => (
            (level < 2) ? (
              <Redirect to='/'/>
            ) : (
              <Add setActiveSubtab={this.setActiveSubtab} addNotification={this.props.addNotification} renderError={this.renderError} addToClients={this.addToClients} level={this.props.level} checkLevel={this.props.checkLevel}/>
            )
          )}/>
          <Route path="/clients/:id/note" render={(location) => (
            (level < 2) ? (
              <Redirect to='/'/>
            ) : (
              <Note setActiveSubtab={this.setActiveSubtab} addNotification={this.props.addNotification} renderError={this.renderError} location={location} />
            )
          )}/>
          <Route path="/clients/:id/edit" render={(location) => (
            (level < 2) ? (
              <Redirect to='/'/>
            ) : (
              <Edit setActiveSubtab={this.setActiveSubtab} addNotification={this.props.addNotification} renderError={this.renderError} location={location} updateClients={this.updateClients}/>
            )
          )}/>
          <Route path="/clients/:id" render={(location) =>
            <View setActiveSubtab={this.setActiveSubtab} addNotification={this.props.addNotification} location={location} removeFromClients={this.removeFromClients}/>
          }/>
        </Switch>
      </div>
    );
  }
}

export default Client;