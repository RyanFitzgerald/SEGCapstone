import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import * as api from '../api';

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
    this.getTypes = this.getTypes.bind(this);

    // State
    this.state = {
      activeSubtab: 1,
      types: null
    };
  }

  componentDidMount() {
    // Set Page Title
    document.title = 'Project Overview | Renovaction';

    // Update tab
    this.props.setActiveTab(2);

    // Get project types
    this.getTypes();
  }

  setActiveSubtab(tab) {
    this.setState({activeSubtab: tab});
  }

  getTypes() {
    api.getTypes().then(types => {
      this.setState({ types });
    });
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
            <Add setActiveSubtab={this.setActiveSubtab} types={this.state.types}/>
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
};

export default Project;