import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {GoogleMap, withGoogleMap, withScriptjs} from "react-google-maps"
import beehiveIcon from '../assets/images/icons/beehive2.png';
import gardenIcon from '../assets/images/icons/garden3.png';
import eggsIcon from '../assets/images/icons/eggs.png';
import ClickableMapMarker from "./Home/ClickableMapMarker";

class GoogleMapView extends Component {
  constructor(props, context) {
    super(props, context);
  }

  onMarkerClick = (_id) => {
    this.props.history.push(`/${_id}`);

  };

  render() {
    const {locations} = this.props;
    // const image = {
    //     url: behiveIcon,
    //     scaledSize: new window.google.maps.Size(53, 53),
    //     // options: {optimized: false}
    // };


    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{lat: 42.2793, lng: -71.4162}}>
        {
          locations.map((l, i) =>
            <ClickableMapMarker key={i}
                                minDelta={0.5}
                                maxDelta={2}
                                position={{lat: parseFloat(l.lat), lng: parseFloat(l.lng)}}
                                icon={{
                                  url: l.type === 1 ? gardenIcon : l.type === 2 ? beehiveIcon : eggsIcon,
                                  scaledSize: new window.google.maps.Size(53, 53),
                                }}
                                id={l._id}
                                onMarkerClick={this.onMarkerClick}
            />
          )

        }
        {/*<Marker minDelta={0.5}*/}
        {/*maxDelta={2}*/}
        {/*position={{lat: 42.2729066, lng: -71.4420097}}*/}
        {/*icon={{*/}
        {/*url: beehiveIcon,*/}
        {/*scaledSize: new window.google.maps.Size(53, 53),*/}
        {/*}}*/}
        {/*/>*/}
        {/*<Marker*/}
        {/*minDelta={0.5}*/}
        {/*maxDelta={2}*/}
        {/*position={{lat: 42.28, lng: -71.45}}*/}
        {/*icon={{*/}
        {/*url: gardenIcon,*/}
        {/*scaledSize: new window.google.maps.Size(53, 53),*/}
        {/*// options: {optimized: false}*/}
        {/*}}*/}

        {/*/>*/}
        {/*<Marker*/}
        {/*minDelta={0.5}*/}
        {/*maxDelta={2}*/}
        {/*position={{lat: 42.29, lng: -71.46}}*/}
        {/*icon={{*/}
        {/*url: eggsIcon,*/}
        {/*scaledSize: new window.google.maps.Size(53, 53),*/}
        {/*// options: {optimized: false}*/}
        {/*}}*/}

        {/*/>*/}
      </GoogleMap>
    );
  }
}


export default withRouter(withScriptjs(withGoogleMap(GoogleMapView)));


