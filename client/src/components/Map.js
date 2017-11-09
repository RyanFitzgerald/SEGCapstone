import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"

const Map = withScriptjs(withGoogleMap((props) => 
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 45.4215, lng: -75.6972 }}
  >
    {props.children}
  </GoogleMap>
));

export default Map;