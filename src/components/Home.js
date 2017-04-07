import React, { Component, PropTypes } from 'react';

class Home extends Component {

    componentDidMount() {
        // Update page title
        document.title = 'Dashboard';

        // Update Active Tab
        this.props.setActiveTab(1);

        // Update Header Title
        this.props.setHeaderTitle('Dashboard');
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
                                    <div className="quick-action rounded">
                                        <div className="qa-icon">
                                            <i className="fa fa-search" aria-hidden="true"></i>
                                        </div>
                                        {/* <!-- End qa-icon --> */}
                                        <div className="qa-text">
                                            <span>Search Projects</span>
                                        </div>
                                        {/* <!-- End qa-text --> */}
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="quick-action rounded">
                                        <div className="qa-icon">
                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                        </div>
                                        {/* <!-- End qa-icon --> */}
                                        <div className="qa-text">
                                            <span>Add Project</span>
                                        </div>
                                        {/* <!-- End qa-text --> */}
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="quick-action rounded">
                                        <div className="qa-icon">
                                            <i className="fa fa-search" aria-hidden="true"></i>
                                        </div>
                                        {/* <!-- End qa-icon --> */}
                                        <div className="qa-text">
                                            <span>Search Customers</span>
                                        </div>
                                        {/* <!-- End qa-text --> */}
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="quick-action rounded">
                                        <div className="qa-icon">
                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                        </div>
                                        {/* <!-- End qa-icon --> */}
                                        <div className="qa-text">
                                            <span>Add Customer</span>
                                        </div>
                                        {/* <!-- End qa-text --> */}
                                    </div>
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
                                test
                            </div>
                            {/* <!-- End dashboard-overview --> */}
                        </div>
                        <div className="small-12 large-6 columns">
                            <h2>Client Overview</h2>
                            <div id="dashboard-notifications" className="rounded">
                                test
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
    setHeaderTitle: PropTypes.func.isRequired
};

export default Home;
