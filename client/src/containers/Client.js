import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

// Import client components
import Submenu from '../components/clients/Submenu';
import Overview from '../components/clients/Overview';
import Add from '../components/clients/Add';
import Directory from '../components/clients/Directory';

class Client extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.setActiveSubtab = this.setActiveSubtab.bind(this);

    // State
    this.state = {
      activeSubtab: 1
    };
  }

  componentDidMount() {
    // Set Page Title
    document.title = 'Clients Overview | Renovaction';

    // Update tab
    this.props.setActiveTab(3);
  }

  setActiveSubtab(tab) {
    this.setState({activeSubtab: tab});
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
            <Directory setActiveSubtab={this.setActiveSubtab}/>
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