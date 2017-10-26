import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as api from '../api';

// Import client components
import Submenu from '../components/clients/Submenu';
import Add from '../components/clients/Add';
import Edit from '../components/clients/Edit';
import Directory from '../components/clients/Directory';
import View from '../components/clients/View';
import Note from '../components/clients/Note';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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

  addNotification(message, type) {
    toast(message, { type });
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
    return (
      <div>
        <ToastContainer 
          position="top-right"
          type="success"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
        />
        <Submenu activeSubtab={this.state.activeSubtab} />

        <Switch>
          <Route exact path="/clients" render={() =>
            <Directory setActiveSubtab={this.setActiveSubtab} clients={this.state.clients} getClients={this.getClients}/>
          }/>
          <Route path="/clients/add" render={() =>
            <Add setActiveSubtab={this.setActiveSubtab} addNotification={this.addNotification} renderError={this.renderError} addToClients={this.addToClients}/>
          }/>
          <Route path="/clients/:id/note" render={(location) =>
            <Note setActiveSubtab={this.setActiveSubtab} addNotification={this.addNotification} renderError={this.renderError} location={location} />
          }/>
          <Route path="/clients/:id/edit" render={(location) =>
            <Edit setActiveSubtab={this.setActiveSubtab} addNotification={this.addNotification} renderError={this.renderError} location={location} updateClients={this.updateClients}/>
          }/>
          <Route path="/clients/:id" render={(location) =>
            <View setActiveSubtab={this.setActiveSubtab} addNotification={this.addNotification} location={location} removeFromClients={this.removeFromClients}/>
          }/>
        </Switch>
      </div>
    );
  }
}

export default Client;