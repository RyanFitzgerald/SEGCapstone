import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Update page title
        document.title = 'Dashboard';

        // Update Header Title
        this.props.setHeaderTitle('Dashboard');

        // Update Active Tab
        this.props.setActiveTab(1);
    }


    render() {
        return (
            <div className="home">
                <div id="dashboard-actions">
                    <div className="row">
                        <div className="small-12 columns">
                            <h2>Quick Actions</h2>
                            <div className="row small-up-1 medium-up-2 large-up-4">
                                <div className="column">
                                    <Link className="quick-action rounded" to="/projects">
                                        <div className="qa-icon">
                                            <i className="fa fa-search" aria-hidden="true"></i>
                                        </div>
                                        {/* <!-- End qa-icon --> */}
                                        <div className="qa-text">
                                            <span>Projects Overview</span>
                                        </div>
                                        {/* <!-- End qa-text --> */}
                                    </Link>
                                </div>
                                <div className="column">
                                    <Link className="quick-action rounded" to="/clients">
                                        <div className="qa-icon">
                                            <i className="fa fa-search" aria-hidden="true"></i>
                                        </div>
                                        {/* <!-- End qa-icon --> */}
                                        <div className="qa-text">
                                            <span>Clients Overview</span>
                                        </div>
                                        {/* <!-- End qa-text --> */}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- End dashboard-actions --> */}

                <div id="dashboard-other">
                    <div className="row">
                        <div className="small-12 large-6 columns">
                            <h2>Project Overview</h2>
                            <div id="dashboard-overview" className="rounded">
                                Content to be determined
                            </div>
                            {/* <!-- End dashboard-overview --> */}
                        </div>
                        <div className="small-12 large-6 columns">
                            <h2>Client Overview</h2>
                            <div id="dashboard-notifications" className="rounded">
                                Content to be determined
                            </div>
                            {/* <!-- End dashboard-notifications --> */}
                        </div>
                    </div>
                </div>
                {/* <!-- End dashboard-other --> */}

            </div>
        );
    }
}

Home.propTypes = {
    setActiveTab: PropTypes.func.isRequired,
    setHeaderTitle: PropTypes.func.isRequired,
    history: PropTypes.any
};

export default Home;
