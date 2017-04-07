import React, { Component, PropTypes } from 'react';
import {Route, Switch} from 'react-router-dom';

// Import components
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Home from '../components/Home';
import NoMatch from '../components/NoMatch';
import Client from './Client';
import Project from './Project';

class App extends Component {
    constructor(props) {
        super(props);

        // Default States
        this.state = {
            activeTab: 1,
            title: 'Dashboard'
        };
    }

    setActiveTab = (tab) => {
        this.setState({
            activeTab: tab
        });
    }

    setHeaderTitle = (newTitle) => {
        this.setState({
            title: newTitle
        });
    }

    render() {
        return (
            <div className="app-container">
                <Sidebar activeTab={this.state.activeTab} />

                <div id="dashboard">
                    <Header title={this.state.title} />

                    <Switch>
                        <Route exact path="/" render={() =>
                            <Home setActiveTab={this.setActiveTab} setHeaderTitle={this.setHeaderTitle} />
                        } />
                        <Route path="/projects" render={() =>
                            <Project setActiveTab={this.setActiveTab} setHeaderTitle={this.setHeaderTitle} />
                        } />
                        <Route path="/clients" render={() =>
                            <Client setActiveTab={this.setActiveTab} setHeaderTitle={this.setHeaderTitle} />
                        } />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.node
};

export default App;
