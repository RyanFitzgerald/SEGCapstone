import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Submenu from '../components/stats/Submenu';
import Total from '../components/stats/Total';
import Type from '../components/stats/Type';
import Salesmen from '../components/stats/Salesmen';
import Referral from '../components/stats/Referral';

class Stats extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.setActiveSubtab = this.setActiveSubtab.bind(this);
    
    // State
    this.state = {
      activeSubtab: 1
    }
  }

  componentDidMount() {
    // Set Page Title
    document.title = 'Statistics | Renovaction';

    // Update tab
    this.props.setActiveTab(4);
  }

  setActiveSubtab(tab) {
    this.setState({activeSubtab: tab});
  }

  render() {
    const level = JSON.parse(sessionStorage.getItem('user')).role.level;

    return (
      <div>
        <Submenu activeSubtab={this.state.activeSubtab}/>

        <Switch>
          <Route exact path="/stats" render={() => (
            (level < 2) ? (
              <Redirect to='/'/>
            ) : (
              <Total setActiveSubtab={this.setActiveSubtab}/>
            )
          )}/>
          <Route path="/stats/type" render={() => (
            (level < 2) ? (
              <Redirect to='/'/>
            ) : (
              <Type setActiveSubtab={this.setActiveSubtab}/>
            )
          )}/>
          <Route path="/stats/salesmen" render={() => (
            (level < 2) ? (
              <Redirect to='/'/>
            ) : (
              <Salesmen setActiveSubtab={this.setActiveSubtab}/>
            )
          )}/>
          <Route path="/stats/referral" render={() => (
            (level < 2) ? (
              <Redirect to='/'/>
            ) : (
              <Referral setActiveSubtab={this.setActiveSubtab}/>
            )
          )}/>
        </Switch>
      </div>
    );
  }
}

export default Stats;