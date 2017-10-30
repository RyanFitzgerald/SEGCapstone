import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as api from '../api';
import arraySort from 'array-sort';

// Import client components
import Submenu from '../components/projects/Submenu';
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
    this.renderError = this.renderError.bind(this);
    this.sortByKey = this.sortByKey.bind(this);

    // State
    this.state = {
      activeSubtab: 1,
      types: null,
      clients: null,
      projects: null,
      sort: {
        name: null,
        client: null,
        status: null
      }
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
    this.getProjects(false);
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
    api.getClients(false).then(result => {
      this.setState({ clients: result });
    });
  }

  getProjects(query) {
    api.getProjects(query).then(result => {
      const projects = result;
      this.setState({ projects });
    });
  }

  removeFromProjects(id) {
    const projects = [...this.state.projects];
    const updated = projects.filter(el => {
      return el._id !== id;
    });
    this.setState({ projects: updated });
  }

  sortByKey(array, key) {
    let asc = 'asc';
    let desc = 'desc'
    let sortOrder = {name: null, client: null, status: null};
    const arr = Object.keys(array).map((k) => array[k]);
    var sortedArray = [];

    if (key === 'name') {
      if (this.state.sort.name === asc) {
        sortOrder.name = desc;
        sortedArray = arraySort(arr, key, {reverse: true});
      } else {
        sortOrder.name = asc;
        sortedArray = arraySort(arr, key);
      }
    } else if (key === 'client.name') {
      if (this.state.sort.client === asc) {
        sortOrder.client = desc;
        sortedArray = arraySort(arr, key, {reverse: true});
      } else {
        sortOrder.client = asc;
        sortedArray = arraySort(arr, key);;
      }
    } else if (key === 'status') {
      if (this.state.sort.status === asc) {
        sortOrder.status = desc;
        sortedArray = arraySort(arr, key, {reverse: true});
      } else {
        sortOrder.status = asc;
        sortedArray = arraySort(arr, key);;
      }
    }

    // Update state
    this.setState({projects: sortedArray, sort: sortOrder});
  }

  renderError(formError) {
    if (!formError) return;
    return (
      <div className="flash flash--warn">
        <p>{formError}</p>
      </div>
    );
  }

  contentLoaded() {
    return this.state.clients && this.state.projects && this.state.types;
  }

  render() {
    return (
      <div>
        <Submenu activeSubtab={this.state.activeSubtab} level={this.props.level} checkLevel={this.props.checkLevel}/>

        <Switch>
          <Route exact path="/projects" render={() =>
            <Directory setActiveSubtab={this.setActiveSubtab} projects={this.state.projects} types={this.state.types} getProjects={this.getProjects} sortByKey={this.sortByKey} />
          }/>
          <Route path="/projects/add" render={(location) =>
            <Add setActiveSubtab={this.setActiveSubtab} types={this.state.types} clients={this.state.clients} addNotification={this.props.addNotification} renderError={this.renderError} location={location} getProjects={this.getProjects} level={this.props.level} checkLevel={this.props.checkLevel}/>
          }/>
          <Route path="/projects/:id/edit" render={(location) =>
            <Edit setActiveSubtab={this.setActiveSubtab} types={this.state.types} clients={this.state.clients} addNotification={this.props.addNotification} renderError={this.renderError} location={location} getProjects={this.getProjects}/>
          }/>
          <Route path="/projects/:id/note" render={(location) =>
            <Note setActiveSubtab={this.setActiveSubtab} addNotification={this.props.addNotification} renderError={this.renderError} location={location} />
          }/>
          <Route path="/projects/:id/product" render={(location) =>
            <Product setActiveSubtab={this.setActiveSubtab} addNotification={this.props.addNotification} renderError={this.renderError} location={location} />
          }/>
          <Route path="/projects/:id/photo" render={(location) =>
            <Photo setActiveSubtab={this.setActiveSubtab} addNotification={this.props.addNotification} renderError={this.renderError} location={location} />
          }/>
          <Route path="/projects/:id/file" render={(location) =>
            <File setActiveSubtab={this.setActiveSubtab} addNotification={this.props.addNotification} renderError={this.renderError} location={location} />
          }/>
          <Route path="/projects/:id/update" render={(location) =>
            <CostUpdate setActiveSubtab={this.setActiveSubtab} addNotification={this.props.addNotification} renderError={this.renderError} location={location} />
          }/>
          <Route path="/projects/:id" render={(location) =>
            <View setActiveSubtab={this.setActiveSubtab} addNotification={this.props.addNotification} location={location} removeFromProjects={this.removeFromProjects}/>
          }/>
        </Switch>
      </div>
    );
  }
}

export default Project;