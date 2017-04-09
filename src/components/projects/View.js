import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router-dom';
import * as api from '../../api';

class View extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project: null
        };
    }

    componentDidMount() {
        // Update page title
        document.title = `View Project ${this.props.match.params.projectID}`;

        // Update Active Tab (zero to hide)
        this.props.setHeaderTab(0);

        // Get Project
        this.getProject(this.props.match.params.projectID);
    }

    getProject = projectID => {
        api.getProjectByID(projectID).then(project => {
            this.setState({
                project
            });
        });
    }

    handleDelete = (e) => {
        e.preventDefault();
        this.props.deleteProject(this.props.match.params.projectID);
    }

    currentContent() {
        if (this.state.project) {
            return (
                <div id="dashboard-project">
                    <div className="row">
                        <div className="small-12 columns">
                            <h2>Project Overview</h2>
                            <div id="project-info" className="dashboard-block">
                                <div className="row">
                                    <div className="small-12 large-8 columns">
                                        <div id="project-info-basic">
                                            <h3>Basic Information</h3>
                                            <ul>
                                                <li>
                                                    <b>Project ID: </b> {this.state.project.project_id}
                                                </li>
                                                <li>
                                                    <b>Name: </b> {this.state.project.name}
                                                </li>
                                                <li>
                                                    <b>Type: </b> {this.state.project.type}
                                                </li>
                                                <li>
                                                    <p>
                                                        <b>Description: </b> {this.state.project.description}
                                                    </p>
                                                </li>
                                                <li>
                                                    <b>Start Date: </b> {this.state.project.start_date}
                                                </li>
                                                <li>
                                                    <b>End Date: </b> {this.state.project.end_date}
                                                </li>
                                                <li>
                                                    <b>Estimated Cost: </b> {this.state.project.estimated_cost}
                                                </li>
                                                <li>
                                                    <b>Actual Cost: </b> {this.state.project.final_cost}
                                                </li>
                                            </ul>
                                            <div id="project-actions">
                                                <Link className="btn-dark" to={`/clients/${this.state.project.client_id}`}>View Project Client</Link>
                                                <Link className="btn-dark" to={`/projects/${this.state.project.project_id}/edit`}>Edit Project</Link>
                                                <a onClick={this.handleDelete} className="btn-warn" href="#">Delete Project</a>
                                            </div>
                                            {/* <!-- End project-actions --> */}
                                        </div>
                                        {/* <!-- End project-info --> */}
                                    </div>
                                    <div className="small-12 large-4 columns">
                                        <div id="project-info-location">
                                            <h3>Location</h3>
                                            <div id="project-map">
                                            </div>
                                            {/* <!-- End client-map --> */}
                                            <ul>
                                                <li>
                                                    {this.state.project.street}
                                                </li>
                                                <li>
                                                    {this.state.project.city}, ON {this.state.project.postal_code}
                                                </li>
                                                <li>
                                                    Canada
                                                </li>
                                            </ul>
                                            <a href="#">Get Directions</a>
                                        </div>
                                        {/* <!-- End project-info --> */}
                                    </div>
                                </div>
                            </div>
                            {/* <!-- End project-info --> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="small-12 large-6 columns">
                            <h2>Project Photos (3)</h2>
                            <div id="project-photos" className="dashboard-block">
                                <a id="add-project-photo" className="btn" href="#">Add Project Photo</a>
                                <div className="row small-up-1 medium-up-2 large-up-4">
                                    <div className="column">
                                        <img src="assets/images/project-photo.jpg" alt="project-photo"/>
                                    </div>
                                    <div className="column">
                                        <img src="assets/images/project-photo.jpg" alt="project-photo"/>
                                    </div>
                                    <div className="column">
                                        <img src="assets/images/project-photo.jpg" alt="project-photo"/>
                                    </div>
                                    <div className="column">
                                        <img src="assets/images/project-photo.jpg" alt="project-photo"/>
                                    </div>
                                    <div className="column">
                                        <img src="assets/images/project-photo.jpg" alt="project-photo"/>
                                    </div>
                                    <div className="column">
                                        <img src="assets/images/project-photo.jpg" alt="project-photo"/>
                                    </div>
                                    <div className="column">
                                        <img src="assets/images/project-photo.jpg" alt="project-photo"/>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- End project-photos --> */}
                        </div>
                        <div className="small-12 large-6 columns">
                            <h2>Project Notes (2)</h2>
                            <div id="project-notes" className="dashboard-block">
                                <a id="add-project-note" className="btn" href="#">Add Project Note</a>
                                <ul>
                                    <li>
                                        <span>Added March 3, 2017 by Ryan</span>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet sem felis. Fusce varius, eros sit amet dictum dictum, tortor purus auctor ligula, ut accumsan tortor massa id purus. Vivamus elit urna, fringilla non ipsum vel, molestie volutpat turpis.
                                        </p>
                                    </li>
                                    <li>
                                        <span>Added March 2, 2017 by Ryan</span>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet sem felis. Fusce varius, eros sit amet dictum dictum, tortor purus auctor ligula, ut accumsan tortor massa id purus. Vivamus elit urna, fringilla non ipsum vel, molestie volutpat turpis.
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            {/* <!-- End project-photos --> */}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <h1>Loading</h1>
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
    deleteProject: PropTypes.func.isRequired
};

export default View;
