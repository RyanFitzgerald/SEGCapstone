import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import * as api from '../api';

// Import client components
import Submenu from '../components/clients/Submenu';
import Overview from '../components/clients/Overview';
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
    this.searchClients = this.searchClients.bind(this);

    // State
    this.state = {
      activeSubtab: 1,
      clients: null
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

  getClients() {
    api.getClients().then(clients => {
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

  searchClients(query) {
    api.searchClients(query).then(clients => {
      this.setState({ clients });
    });
  }

  render() {
    return (
      <div>
        <Submenu activeSubtab={this.state.activeSubtab} />

        <Switch>
          <Route exact path="/clients" render={() =>
            <Overview setActiveSubtab={this.setActiveSubtab}/>
          }/>
          <Route path="/clients/add" render={() =>
            <Add setActiveSubtab={this.setActiveSubtab} addToClients={this.addToClients}/>
          }/>
          <Route path="/clients/list" render={() =>
            <Directory setActiveSubtab={this.setActiveSubtab} clients={this.state.clients} searchClients={this.searchClients}/>
          }/>
          <Route path="/clients/:id/note" render={(location) =>
            <Note setActiveSubtab={this.setActiveSubtab} location={location} />
          }/>
          <Route path="/clients/:id/edit" render={(location) =>
            <Edit setActiveSubtab={this.setActiveSubtab} location={location} updateClients={this.updateClients}/>
          }/>
          <Route path="/clients/:id" render={(location) =>
            <View setActiveSubtab={this.setActiveSubtab} location={location} removeFromClients={this.removeFromClients}/>
          }/>
        </Switch>
      </div>
    );
  }
}

Client.propTypes = {
  setActiveTab: PropTypes.func.isRequired
};

export default Client;