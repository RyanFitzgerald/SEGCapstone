import React, { Component, PropTypes } from 'react';
import {Route, Switch, Link} from 'react-router-dom';

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
            headerTab: 1
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
    }

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
                        <li>
                            <Link to="/projects/22">View</Link>
                        </li>
                        <li>
                            <Link to="/projects/22/edit">Edit</Link>
                        </li>
                    </ul>
                </div>
                {/* <!-- End page-navigation --> */}

                <Switch>
                    <Route exact path="/projects" render={() =>
                        <Summary setHeaderTab={this.setHeaderTab} />
                    } />
                    <Route path="/projects/search" render={() =>
                        <Search setHeaderTab={this.setHeaderTab} />
                    } />
                    <Route path="/projects/add" render={() =>
                        <Add setHeaderTab={this.setHeaderTab} />
                    } />
                    <Route path="/projects/:projectID/edit" render={({match}) =>
                        <Edit setHeaderTab={this.setHeaderTab} match={match} />
                    } />
                    <Route path="/projects/:projectID" render={({match}) =>
                        <View setHeaderTab={this.setHeaderTab} match={match} />
                    } />
                </Switch>
            </div>
        );
    }
}

Project.propTypes = {
    setActiveTab: PropTypes.func.isRequired,
    setHeaderTitle: PropTypes.func.isRequired
};

export default Project;
