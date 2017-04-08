import React, { Component, PropTypes } from 'react';
import {withRouter, Route, Switch, Link} from 'react-router-dom';
import * as api from '../api';

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
            headerTab: 1,
            cities: null,
            clients: null,
            lastUpdated: null
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

        // Get cities
        this.getCities();

        // Get clients
        this.getClients();
    }

    addClient = client => {
        api.addClient(client).then(resp => {
            this.getClients();
            this.props.history.push(`/clients/${resp.clientID}`);
        });
    }

    editClient = client => {
        api.editClient(client).then(resp => {
            this.getClients();
            this.props.history.push(`/clients/${resp.clientID}`);
        });
    }

    deleteClient = clientID => {
        api.deleteClient(clientID).then(() => {
            this.getClients();
            this.props.history.push('/clients');
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
                    </ul>
                </div>
                {/* <!-- End page-navigation --> */}

                <Switch>
                    <Route exact path="/clients" render={() =>
                        <Summary setHeaderTab={this.setHeaderTab} />
                    } />
                    <Route path="/clients/search" render={() =>
                        <Search setHeaderTab={this.setHeaderTab} clients={this.state.clients} />
                    } />
                    <Route path="/clients/add" render={() =>
                        <Add setHeaderTab={this.setHeaderTab} addClient={this.addClient} cities={this.state.cities} />
                    } />
                    <Route path="/clients/:clientID/edit" render={({match}) =>
                        <Edit setHeaderTab={this.setHeaderTab} match={match} editClient={this.editClient} cities={this.state.cities} />
                    } />
                    <Route path="/clients/:clientID" render={({match}) =>
                        <View setHeaderTab={this.setHeaderTab} match={match} deleteClient={this.deleteClient} />
                    } />
                </Switch>
            </div>
        );
    }
}

Client.propTypes = {
    setActiveTab: PropTypes.func.isRequired,
    setHeaderTitle: PropTypes.func.isRequired,
    history: PropTypes.any
};

export default withRouter(Client);
