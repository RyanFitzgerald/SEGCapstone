import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router-dom';
import * as api from '../../api';

import Loading from '../Loading';
import Map from '../Map';

class View extends Component {
    constructor(props) {
        super(props);

        this.state = {
            client: null,
            projects: null
        };
    }

    componentDidMount() {
        // Update Active Tab (zero to hide)
        this.props.setHeaderTab(0);

        // Get client
        this.getClient(this.props.match.params.clientID);

        // Get client projects
        this.getProjects(this.props.match.params.clientID);
    }

    getClient = clientID => {
        api.getClientByID(clientID).then(client => {
            this.setState({
                client
            }, () => {
                document.title = `Client - ${this.state.client.name}`;
            });
        });
    }

    getProjects = clientID => {
        api.getProjectsByClientID(clientID).then(projects => {
            this.setState({
                projects
            });
        });
    }

    handleDelete = (e) => {
        e.preventDefault();
        this.props.deleteClient(this.props.match.params.clientID);
    }

    currentContent() {
        if (this.state.client && this.state.projects) {
            return (
                <div id="dashboard-client">
                    <div className="row">
                        <div className="small-12 columns">
                            <h2>Client Overview</h2>
                            <div id="client-info" className="dashboard-block">
                                <div className="row">
                                    <div className="small-12 large-8 columns">
                                        <div id="client-info-basic">
                                            <h3>Basic Information</h3>
                                            <ul>
                                                <li>
                                                    <b><i className="fa fa-hashtag" aria-hidden="true"></i> Client ID: </b> {this.state.client.client_id}
                                                </li>
                                                <li>
                                                    <b><i className="fa fa-user" aria-hidden="true"></i> Name: </b> {this.state.client.name}
                                                </li>
                                                <li>
                                                    <b><i className="fa fa-envelope-o" aria-hidden="true"></i> Email: </b> <a href={`mailto:${this.state.client.email}`}>{this.state.client.email}</a>
                                                </li>
                                                <li>
                                                    <b><i className="fa fa-phone" aria-hidden="true"></i> Phone Number: </b> <a href={`tel:${this.state.client.telephone}`}>{this.state.client.telephone}</a>
                                                </li>
                                            </ul>
                                            <div id="client-actions">
                                                <Link className="btn-dark" to={`/clients/${this.state.client.client_id}/edit`}>Edit Client</Link>
                                                <a onClick={this.handleDelete} className="btn-warn" href="#">Delete Client</a>
                                            </div>
                                            {/* <!-- End client-actions --> */}
                                        </div>
                                        {/* <!-- End client-info --> */}
                                    </div>
                                    <div className="small-12 large-4 columns">
                                        <div id="client-info-location">
                                            <h3>Location</h3>
                                            <div id="client-map">
                                                <Map google={window.google} />
                                            </div>
                                            {/* <!-- End client-map --> */}
                                            <ul>
                                                <li>
                                                    {this.state.client.street}
                                                </li>
                                                <li>
                                                    {this.state.client.city}, ON {this.state.client.postal_code.toUpperCase()}
                                                </li>
                                                <li>
                                                    Canada
                                                </li>
                                            </ul>
                                            <a href="#">Get Directions</a>
                                        </div>
                                        {/* <!-- End client-info --> */}
                                    </div>
                                </div>
                            </div>
                            {/* <!-- End client-info --> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="small-12 large-8 columns">
                            <h2>Client Projects ({this.state.projects.length})</h2>
                            {this.state.projects.map(project => {
                                return (
                                    <div key={project.project_id} className="project-result dashboard-block">
                                        <div className="row">
                                            <div className="small-12 large-9 columns">
                                                <div className="project-result-info">
                                                    <h3><span className="project-result-status complete">Complete</span> {project.name}</h3>
                                                    <span><b>Location: </b>{project.city}, Ontario</span>
                                                    <span><b>Type: </b>{project.type}</span>
                                                    <p>{project.description}</p>
                                                </div>
                                                {/* <!-- End project-result-info --> */}
                                            </div>
                                            <div className="small-12 large-3 columns">
                                                <div className="project-result-actions">
                                                    <Link className="btn-dark" to={`/projects/${project.project_id}`}>View Project</Link>
                                                    <Link className="btn-dark" to={`/projects/${project.project_id}/edit`}>Edit Project</Link>
                                                </div>
                                                {/* <!-- End project-result-actions --> */}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="small-12 large-4 columns">
                            <div className="search-tips dashboard-block">
                                <h3>Actions</h3>
                                <p>
                                    List of possible actions such as Add Project for this client, add project in general, search project, search clients
                                </p>
                            </div>
                            {/* <!-- End search-tips --> */}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <Loading />
        );

    }

    render() {
        return (
            <div>
                {this.currentContent()}
            </div>
        );
    }
}

View.propTypes = {
    match: PropTypes.any,
    setHeaderTab: PropTypes.func.isRequired,
    deleteClient: PropTypes.func.isRequired
};

export default View;
