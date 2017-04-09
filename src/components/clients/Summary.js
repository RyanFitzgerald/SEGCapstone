import React, { Component, PropTypes } from 'react';

class Summary extends Component {

    componentDidMount() {
        document.title = 'Client Summary';

        // Update Active Tab
        this.props.setHeaderTab(1);
    }

    render() {
        return (
            <div id="dashboard-other">
                <div className="row">
                    <div className="small-12 large-6 columns">
                        <h2>Client Overview</h2>
                        <div id="dashboard-overview" className="rounded">
                            Content to be determined
                        </div>
                        {/* <!-- End dashboard-overview --> */}
                    </div>
                    <div className="small-12 large-6 columns">
                        <h2>Client Statistics</h2>
                        <div id="dashboard-notifications" className="rounded">
                            Content to be determined
                        </div>
                        {/* <!-- End dashboard-notifications --> */}
                    </div>
                </div>
            </div>
        );
    }
}

Summary.propTypes = {
    setHeaderTab: PropTypes.func.isRequired
};

export default Summary;
