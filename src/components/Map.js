import React, { Component, PropTypes } from 'react';

import Map from 'google-maps-react';

class MapContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        };
    }

    render() {
        return (
            <Map google={this.props.google}
            className={'map'}
            zoom={14}
            containerStyle={{}} />
        );
    }

}

MapContainer.propTypes = {
    google: PropTypes.any
};

export default MapContainer;
