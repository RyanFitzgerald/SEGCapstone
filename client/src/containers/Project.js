import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

// Import client components
import Submenu from '../components/projects/Submenu';
import Overview from '../components/projects/Overview';
import Add from '../components/projects/Add';
import Directory from '../components/projects/Directory';

class Project extends React.Component {
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
    document.title = 'Project Overview | Renovaction';

    // Update tab
    this.props.setActiveTab(2);
  }

  setActiveSubtab(tab) {
    this.setState({activeSubtab: tab});
  }

  render() {
    return (
      <div>
        <Submenu activeSubtab={this.state.activeSubtab} />

        <Switch>
          <Route exact path="/projects" render={() =>
            <Overview setActiveSubtab={this.setActiveSubtab}/>
          }/>
          <Route path="/projects/add" render={() =>
            <Add setActiveSubtab={this.setActiveSubtab}/>
          }/>
          <Route path="/projects/list" render={() =>
            <Directory setActiveSubtab={this.setActiveSubtab}/>
          }/>
        </Switch>
      </div>
    );
  }
}

Project.propTypes = {
  setActiveTab: PropTypes.func.isRequired
}

export default Project;