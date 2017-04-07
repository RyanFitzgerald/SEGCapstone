import React, { Component, PropTypes } from 'react';
import {Route, Switch, Link} from 'react-router-dom';

// Import Client Components
import Summary from '../components/clients/Summary';
import Add from '../components/clients/Add';
import Edit from '../components/clients/Edit';
import View from '../components/clients/View';
import Search from '../components/clients/Search';

class Client extends Component {

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
        document.title = 'Clients Overview';

        // Update Active Tab
        this.props.setActiveTab(3);

        // Update Header Title
        this.props.setHeaderTitle('Clients');
    }

    render() {
        return (
            <div className="clients">
                <div id="page-navigation">
                    <ul>
                        <li className={(this.state.headerTab == 1) ? 'active' : ''}>
                            <Link to="/clients">Overview</Link>
                        </li>
                        <li className={(this.state.headerTab == 2) ? 'active' : ''}>
                            <Link to="/clients/search">Search</Link>
                        </li>
                        <li className={(this.state.headerTab == 3) ? 'active' : ''}>
                            <Link to="/clients/add">Add</Link>
                        </li>
                        <li>
                            <Link to="/clients/22">View</Link>
                        </li>
                        <li>
                            <Link to="/clients/22/edit">Edit</Link>
                        </li>
                    </ul>
                </div>
                {/* <!-- End page-navigation --> */}

                <Switch>
                    <Route exact path="/clients" render={() =>
                        <Summary setHeaderTab={this.setHeaderTab} />
                    } />
                    <Route path="/clients/search" render={() =>
                        <Search setHeaderTab={this.setHeaderTab} />
                    } />
                    <Route path="/clients/add" render={() =>
                        <Add setHeaderTab={this.setHeaderTab} />
                    } />
                    <Route path="/clients/:clientID/edit" render={({match}) =>
                        <Edit setHeaderTab={this.setHeaderTab} match={match} />
                    } />
                    <Route path="/clients/:clientID" render={({match}) =>
                        <View setHeaderTab={this.setHeaderTab} match={match} />
                    } />
                </Switch>
            </div>
        );
    }
}

Client.propTypes = {
    setActiveTab: PropTypes.func.isRequired,
    setHeaderTitle: PropTypes.func.isRequired
};

export default Client;
