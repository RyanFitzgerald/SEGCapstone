import React, { Component, PropTypes } from 'react';

class View extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Update page title
        document.title = `Client ${this.props.match.params.clientID}`;

        // Update Active Tab (zero to hide)
        this.props.setHeaderTab(0);
    }

    render() {
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
                                                <b>Project ID: </b> 1
                                            </li>
                                            <li>
                                                <b>Name: </b> John Doe
                                            </li>
                                            <li>
                                                <p>
                                                    <b>Description: </b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet sem felis. Fusce varius, eros sit amet dictum dictum, tortor purus auctor ligula, ut accumsan tortor massa id purus.
                                                </p>
                                            </li>
                                            <li>
                                                <b>Start Date: </b> March 12, 2017
                                            </li>
                                            <li>
                                                <b>End Date: </b> March 13, 2017
                                            </li>
                                            <li>
                                                <b>Estimated Cost: </b> $15,430.98
                                            </li>
                                            <li>
                                                <b>Actual Cost: </b> $16,232.32
                                            </li>
                                        </ul>
                                        <div id="project-actions">
                                            <a className="btn-dark" href="#">Edit Project</a>
                                            <a className="btn-warn" href="#">Delete Project</a>
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
                                                123 Main Street
                                            </li>
                                            <li>
                                                Ottawa, ON K4A 1Y6
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
}

View.propTypes = {
    match: PropTypes.any,
    setHeaderTab: PropTypes.func.isRequired
};

export default View;
