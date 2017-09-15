import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import * as api from '../api';

// Import client components
import Submenu from '../components/clients/Submenu';
import Overview from '../components/clients/Overview';
import Add from '../components/clients/Add';
import Directory from '../components/clients/Directory';
import View from '../components/clients/View';


class Client extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.setActiveSubtab = this.setActiveSubtab.bind(this);
    this.getClients = this.getClients.bind(this);

    // State
    this.state = {
      activeSubtab: 1,
      redirect: false
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

  render() {
    return (
      <div>
        <Submenu activeSubtab={this.state.activeSubtab} />

        <Switch>
          <Route exact path="/clients" render={() =>
            <Overview setActiveSubtab={this.setActiveSubtab}/>
          }/>
          <Route path="/clients/add" render={() =>
            <Add setActiveSubtab={this.setActiveSubtab}/>
          }/>
          <Route path="/clients/list" render={() =>
            <Directory setActiveSubtab={this.setActiveSubtab} clients={this.state.clients}/>
          }/>
          <Route path="/clients/:id" render={(location) =>
            <View setActiveSubtab={this.setActiveSubtab} location={location}/>
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