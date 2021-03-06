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
    this.getReferrals = this.getReferrals.bind(this);
    this.addToClients = this.addToClients.bind(this);
    this.updateClients = this.updateClients.bind(this);
    this.removeFromClients = this.removeFromClients.bind(this);
    this.renderError = this.renderError.bind(this);
    this.sortByKey = this.sortByKey.bind(this);
    
    // State
    this.state = {
      activeSubtab: 1,
      clients: null,
      referrals: null,  
      sort: {
        name: null,
        email: null,
        city: null
      }
    };
  }

  componentWillMount() {
    if (localStorage.getItem('user') === null) {
      this.props.logout();
    }
  }

  componentDidMount() {
    // Set Page Title
    document.title = 'Clients Overview | Renovaction';

    // Update tab
    this.props.setActiveTab(3);

    // Get clients
    this.getClients({search: false});

    // Get users
    this.getUsers({search: false});

    // Get referrals
    this.getReferrals();
  }

  setActiveSubtab(tab) {
    this.setState({activeSubtab: tab});
  }

  getClients(query) {
    // Append access token
    query.access_token = JSON.parse(localStorage.getItem('user')).access_token;
    
    api.getClients(query).then(result => {
      const clients = result;
      this.setState({ clients, sort: {name:null, email:null, city:null} });
    });
  }

  getUsers(query) {
    // Append access token
    query.access_token = JSON.parse(localStorage.getItem('user')).access_token;
    
    api.getUsers(query).then(result => {
      const users = result;
      this.setState({ users });
    });
  }

  getReferrals() {
    // Append access token
    const query = {
      access_token: JSON.parse(localStorage.getItem('user')).access_token
    };
    
    api.getReferrals(query).then(result => {
      const referrals = result;
      this.setState({ referrals });
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
    let desc = 'desc';
    let sortOrder = {name: null, email: null, city: null};
    const arr = Object.keys(array).map((k) => array[k]);
    let sortedArray = [];

    if (key === 'lastName') {
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
        sortedArray = arraySort(arr, key);
      }
    }
    else if (key === 'city') {
      if(this.state.sort.city === asc) {
        sortOrder.city = desc;
        sortedArray = arraySort(arr, key, {reverse: true});
      }
      else {
        sortOrder.city = asc;
        sortedArray = arraySort(arr, key);
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
    const level = JSON.parse(localStorage.getItem('user')).role.level;
    return (
      <div>
        <Submenu activeSubtab={this.state.activeSubtab} />

        <Switch>
          <Route exact path="/clients" render={() =>
            <Directory setActiveSubtab={this.setActiveSubtab} clients={this.state.clients} getClients={this.getClients} users={this.state.users} sortByKey={this.sortByKey} sort={this.state.sort} />
          }/>
          <Route path="/clients/add" render={() => (
            (level < 2) ? (
              <Redirect to='/'/>
            ) : (
              <Add setActiveSubtab={this.setActiveSubtab} addNotification={this.props.addNotification} renderError={this.renderError} addToClients={this.addToClients} level={this.props.level} checkLevel={this.props.checkLevel} users={this.state.users} referrals={this.state.referrals}/>
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
              <Edit setActiveSubtab={this.setActiveSubtab} addNotification={this.props.addNotification} renderError={this.renderError} location={location} updateClients={this.updateClients} users={this.state.users} referrals={this.state.referrals}/>
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