import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as api from '../api';

// Import client components
import Submenu from '../components/projects/Submenu';
import Overview from '../components/projects/Overview';
import Add from '../components/projects/Add';
import Directory from '../components/projects/Directory';
import View from '../components/projects/View';
import Edit from '../components/projects/Edit';
import Note from '../components/projects/Note';
import Product from '../components/projects/Product';
import CostUpdate from '../components/projects/CostUpdate';
import Photo from '../components/projects/Photo';
import File from '../components/projects/File';

class Project extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.setActiveSubtab = this.setActiveSubtab.bind(this);
    this.getTypes = this.getTypes.bind(this);
    this.getClients = this.getClients.bind(this);
    this.getProjects = this.getProjects.bind(this);
    this.removeFromProjects = this.removeFromProjects.bind(this);
    this.contentLoaded = this.contentLoaded.bind(this);

    // State
    this.state = {
      activeSubtab: 1,
      types: null,
      clients: null,
      projects: null,
      projectCount: null
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
    this.getProjects(false, 1);
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

  getProjects(query, page) {
    api.getProjects(query, page).then(result => {
      const projects = result.projects;
      const projectCount = result.count;
      this.setState({ projects, projectCount });
    });
  }

  removeFromProjects(id) {
    const projects = [...this.state.projects];
    const updated = projects.filter(el => {
      return el._id !== id;
    });
    this.setState({ projects: updated });
  }

  contentLoaded() {
    return this.state.clients && this.state.projects && this.state.types;
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
            <Add setActiveSubtab={this.setActiveSubtab} types={this.state.types} clients={this.state.clients} location={location} getProjects={this.getProjects}/>
          }/>
          <Route path="/projects/list" render={() =>
            <Directory setActiveSubtab={this.setActiveSubtab} projects={this.state.projects} projectCount={this.state.projectCount} types={this.state.types} getProjects={this.getProjects}/>
          }/>
          <Route path="/projects/:id/edit" render={(location) =>
            <Edit setActiveSubtab={this.setActiveSubtab} types={this.state.types} clients={this.state.clients} location={location} getProjects={this.getProjects}/>
          }/>
          <Route path="/projects/:id/note" render={(location) =>
            <Note setActiveSubtab={this.setActiveSubtab} location={location} />
          }/>
          <Route path="/projects/:id/product" render={(location) =>
            <Product setActiveSubtab={this.setActiveSubtab} location={location} />
          }/>
          <Route path="/projects/:id/photo" render={(location) =>
            <Photo setActiveSubtab={this.setActiveSubtab} location={location} />
          }/>
          <Route path="/projects/:id/file" render={(location) =>
            <File setActiveSubtab={this.setActiveSubtab} location={location} />
          }/>
          <Route path="/projects/:id/update" render={(location) =>
            <CostUpdate setActiveSubtab={this.setActiveSubtab} location={location} />
          }/>
          <Route path="/projects/:id" render={(location) =>
            <View setActiveSubtab={this.setActiveSubtab} location={location} removeFromProjects={this.removeFromProjects}/>
          }/>
        </Switch>
      </div>
    );
  }
}

export default Project;