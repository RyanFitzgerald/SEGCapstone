import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import * as api from '../api';

// Import client components
import Submenu from '../components/projects/Submenu';
import Overview from '../components/projects/Overview';
import Add from '../components/projects/Add';
import Directory from '../components/projects/Directory';
import View from '../components/projects/View';

class Project extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.setActiveSubtab = this.setActiveSubtab.bind(this);
    this.getTypes = this.getTypes.bind(this);
    this.getClients = this.getClients.bind(this);
    this.getProjects = this.getProjects.bind(this);
    this.addToProjects = this.addToProjects.bind(this);
    this.removeFromProjects = this.addToProjects.bind(this);

    // State
    this.state = {
      activeSubtab: 1,
      types: null,
      projects: null
    };
  }

  componentDidMount() {
    // Set Page Title
    document.title = 'Project Overview | Renovaction';

    // Update tab
    this.props.setActiveTab(2);

    // Get project types
    this.getTypes();

    // Get clients
    this.getClients();

    // Get projects
    this.getProjects();
  }

  setActiveSubtab(tab) {
    this.setState({activeSubtab: tab});
  }

  getTypes() {
    api.getTypes().then(types => {
      this.setState({ types });
    });
  }

  getClients() {
    api.getClients().then(clients => {
      this.setState({ clients });
    });
  }

  getProjects() {
    api.getProjects().then(projects => {
      this.setState({ projects });
    });
  }

  addToProjects(project) {
    this.getProjects();
  }

  removeFromProjects(id) {
    const projects = [...this.state.projects];
    const updated = projects.filter(el => {
      return el._id !== id;
    });
    this.setState({ projects: updated });
  }

  render() {
    return (
      <div>
        <Submenu activeSubtab={this.state.activeSubtab} />

        <Switch>
          <Route exact path="/projects" render={() =>
            <Overview setActiveSubtab={this.setActiveSubtab}/>
          }/>
          <Route path="/projects/add" render={(location) =>
            <Add setActiveSubtab={this.setActiveSubtab} types={this.state.types} clients={this.state.clients} location={location} addToProjects={this.addToProjects}/>
          }/>
          <Route path="/projects/list" render={() =>
            <Directory setActiveSubtab={this.setActiveSubtab} projects={this.state.projects}/>
          }/>
          <Route path="/projects/:id" render={(location) =>
            <View setActiveSubtab={this.setActiveSubtab} location={location} removeFromProjects={this.removeFromProjects}/>
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