import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
require('dotenv').config({ path: 'variables.env' });

class MapContainer extends React.Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14} clickableIcons={false} initialCenter={{lat: this.props.lat, lng: this.props.long}}>
        <Marker
          position={{lat: this.props.lat, lng: this.props.long}} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyArcer_H0GBqow2FBqyO3N_BLVXfXkg6ys'
})(MapContainer)