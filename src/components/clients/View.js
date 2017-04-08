import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router-dom';
import * as api from '../../api';

class View extends Component {
    constructor(props) {
        super(props);

        this.state = {
            client: null
        };
    }

    componentDidMount() {
        // Update page title
        document.title = `View Client ${this.props.match.params.clientID}`;

        // Update Active Tab (zero to hide)
        this.props.setHeaderTab(0);

        // Get client
        this.getClient(this.props.match.params.clientID);
    }

    getClient = clientID => {
        api.getClientByID(clientID).then(client => {
            this.setState({
                client
            });
        });
    }

    handleDelete = (e) => {
        e.preventDefault();
        this.props.deleteClient(this.props.match.params.clientID);
    }

    currentContent() {
        if (this.state.client) {
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
                                                    <b>Client ID: </b> {this.state.client.client_id}
                                                </li>
                                                <li>
                                                    <b>Name: </b> {this.state.client.name}
                                                </li>
                                                <li>
                                                    <b>Email: </b> {this.state.client.email}
                                                </li>
                                                <li>
                                                    <b>Phone Number: </b> {this.state.client.telephone}
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
                                            </div>
                                            {/* <!-- End client-map --> */}
                                            <ul>
                                                <li>
                                                    {this.state.client.street}
                                                </li>
                                                <li>
                                                    {this.state.client.city}, ON {this.state.client.postal_code}
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
                            <h2>Client Projects (3)</h2>
                            <div className="project-result dashboard-block">
                                <div className="row">
                                    <div className="small-12 large-9 columns">
                                        <div className="project-result-info">
                                            <h3><span className="project-result-status complete">Complete</span> Doe Family Project</h3>
                                            <span><b>Location: </b>Ottawa, Ontario</span>
                                            <span><b>Type: </b>Siding, Roofing</span>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a cursus augue. Sed a euismod lorem. Pellentesque posuere molestie nisi vitae viverra.
                                            </p>

                                        </div>
                                        {/* <!-- End project-result-info --> */}
                                    </div>
                                    <div className="small-12 large-3 columns">
                                        <div className="project-result-actions">
                                            <a className="btn-dark" href="#">View Project</a>
                                            <a className="btn-dark" href="#">Edit Project</a>
                                            <a className="btn-dark" href="#">Delete Project</a>
                                        </div>
                                        {/* <!-- End project-result-actions --> */}
                                    </div>
                                </div>
                            </div>
                            {/* <!-- End project-result --> */}
                            <div className="project-result dashboard-block">
                                <div className="row">
                                    <div className="small-12 large-9 columns">
                                        <div className="project-result-info">
                                            <h3><span className="project-result-status complete">Complete</span> Doe Family Project</h3>
                                            <span><b>Location: </b>Ottawa, Ontario</span>
                                            <span><b>Type: </b>Siding, Roofing</span>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a cursus augue. Sed a euismod lorem. Pellentesque posuere molestie nisi vitae viverra.
                                            </p>

                                        </div>
                                        {/* <!-- End project-result-info --> */}
                                    </div>
                                    <div className="small-12 large-3 columns">
                                        <div className="project-result-actions">
                                            <a className="btn-dark" href="#">View Project</a>
                                            <a className="btn-dark" href="#">Edit Project</a>
                                            <a className="btn-dark" href="#">Delete Project</a>
                                        </div>
                                        {/* <!-- End project-result-actions --> */}
                                    </div>
                                </div>
                            </div>
                            {/* <!-- End project-result --> */}
                            <div className="project-result dashboard-block">
                                <div className="row">
                                    <div className="small-12 large-9 columns">
                                        <div className="project-result-info">
                                            <h3><span className="project-result-status complete">Complete</span> Doe Family Project</h3>
                                            <span><b>Location: </b>Ottawa, Ontario</span>
                                            <span><b>Type: </b>Siding, Roofing</span>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a cursus augue. Sed a euismod lorem. Pellentesque posuere molestie nisi vitae viverra.
                                            </p>

                                        </div>
                                        {/* <!-- End project-result-info --> */}
                                    </div>
                                    <div className="small-12 large-3 columns">
                                        <div className="project-result-actions">
                                            <a className="btn-dark" href="#">View Project</a>
                                            <a className="btn-dark" href="#">Edit Project</a>
                                            <a className="btn-dark" href="#">Delete Project</a>
                                        </div>
                                        {/* <!-- End project-result-actions --> */}
                                    </div>
                                </div>
                            </div>
                            {/* <!-- End project-result --> */}
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
    setHeaderTab: PropTypes.func.isRequired
};

export default View;
