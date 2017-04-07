import React, { Component, PropTypes } from 'react';

// Import components

class NoMatch extends Component {
    render() {
        return (
            <div id="404">
                <h1>404 Not Found</h1>
            </div>
        );
    }
}

NoMatch.propTypes = {
    children: PropTypes.node
};

export default NoMatch;
