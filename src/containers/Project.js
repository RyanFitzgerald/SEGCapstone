import React, { Component, PropTypes } from 'react';
import {withRouter, Route, Switch, Link} from 'react-router-dom';
import * as api from '../api';

// Import Client Components
import Summary from '../components/projects/Summary';
import Add from '../components/projects/Add';
import Edit from '../components/projects/Edit';
import View from '../components/projects/View';
import Search from '../components/projects/Search';

class Project extends Component {

    constructor(props) {
        super(props);

        // States
        this.state = {
            headerTab: 1,
            cities: null,
            clients: null,
            projects: null,
            projectTypes: null
        };
    }

    setHeaderTab = (tab) => {
        this.setState({
            headerTab: tab
        });
    }

    componentDidMount() {
        // Update page title
        document.title = 'Projects Overview';

        // Update Active Tab
        this.props.setActiveTab(2);

        // Update Header Title
        this.props.setHeaderTitle('Projects');

        // Get cities
        this.getCities();

        // Get clients
        this.getClients();

        // Get projects
        this.getProjects();

        // Get project types
        this.getProjectTypes();
    }

    addProject = project => {
        api.addProject(project).then(resp => {
            this.getProjects();
            this.props.history.push(`/projects/${resp.projectID}`);
        });
    }

    editProject = project => {
        api.editProject(project).then(resp => {
            this.getProjects();
            this.props.history.push(`/projects/${resp.projectID}`);
        });
    }

    deleteProject = projectID => {
        api.deleteProject(projectID).then(() => {
            this.getProjects();
            this.props.history.push('/projects');
        });
    }

    getProjects = () => {
        api.getProjects().then(projects => {
            this.setState({
                projects
            });
        });
    }

    getCities = () => {
        api.getCities().then(cities => {
            this.setState({
                cities
            });
        });
    }

    getClients = () => {
        api.getClients().then(clients => {
            this.setState({
                clients
            });
        });
    }

    getProjectTypes = () => {
        api.getProjectTypes().then(projectTypes => {
            this.setState({
                projectTypes
            });
        });
    }

    searchProjects = projectName => {
        api.searchProjects(projectName).then(projects => {
            this.setState({
                projects
            });
        });
    };

    render() {
        return (
            <div className="projects">
                <div id="page-navigation">
                    <ul>
                        <li className={(this.state.headerTab == 1) ? 'active' : ''}>
                            <Link to="/projects">Overview</Link>
                        </li>
                        <li className={(this.state.headerTab == 2) ? 'active' : ''}>
                            <Link to="/projects/search">Search</Link>
                        </li>
                        <li className={(this.state.headerTab == 3) ? 'active' : ''}>
                            <Link to="/projects/add">Add</Link>
                        </li>
                    </ul>
                </div>
                {/* <!-- End page-navigation --> */}

                <Switch>
                    <Route exact path="/projects" render={() =>
                        <Summary setHeaderTab={this.setHeaderTab} />
                    } />
                    <Route path="/projects/search" render={() =>
                        <Search setHeaderTab={this.setHeaderTab} searchProjects={this.searchProjects} projects={this.state.projects} cities={this.state.cities} projectTypes={this.state.projectTypes} />
                    } />
                    <Route path="/projects/add" render={() =>
                        <Add setHeaderTab={this.setHeaderTab} addProject={this.addProject} cities={this.state.cities} clients={this.state.clients} projectTypes={this.state.projectTypes} />
                    } />
                    <Route path="/projects/:projectID/edit" render={({match}) =>
                        <Edit setHeaderTab={this.setHeaderTab} match={match} editProject={this.editProject} cities={this.state.cities} clients={this.state.clients} projectTypes={this.state.projectTypes} />
                    } />
                    <Route path="/projects/:projectID" render={({match}) =>
                        <View setHeaderTab={this.setHeaderTab} match={match} deleteProject={this.deleteProject} />
                    } />
                </Switch>
            </div>
        );
    }
}

Project.propTypes = {
    setActiveTab: PropTypes.func.isRequired,
    setHeaderTitle: PropTypes.func.isRequired,
    history: PropTypes.any
};

export default withRouter(Project);
