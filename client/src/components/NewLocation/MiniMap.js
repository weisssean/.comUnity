import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps"
import beehiveIcon from '../../assets/images/icons/beehive2.png';
import gardenIcon from '../../assets/images/icons/garden3.png';
import eggsIcon from '../../assets/images/icons/eggs.png';
import PropTypes from "prop-types";
import * as locationsActions from "../../actions/locationsActions";

class MiniMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center:{lat: 42.2793, lng: -71.4162}
        };
    }
    render() {
        return (
            <GoogleMap
                defaultZoom={13}
                defaultCenter={{lat: 42.2793, lng: -71.4162}}
                center={this.props.center}

            >
                <Marker
                    minDelta={0.5}
                    maxDelta={2}
                    draggable
                    onDragEnd={this.props.onDragEnd}
                    position={{lat: parseFloat(this.props.location.lat), lng: parseFloat(this.props.location.lng)}}
                    icon={{
                        url: this.props.location.type === 1 ? gardenIcon : this.props.location.type === 2 ? beehiveIcon : eggsIcon,
                        scaledSize: new window.google.maps.Size(53, 53),
                    }}
                />
            </GoogleMap>
        );
    }
}

MiniMap.propTypes = {
    onDragEnd: PropTypes.func.isRequired,
    defaultCenter: PropTypes.object,
    location: PropTypes.object.isRequired,
    center:PropTypes.object.isRequired
};


//redux connect and map functions
function mapStateToProps(state, ownProps) {
    return {
        center: ownProps.center
    };

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(locationsActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap(MiniMap)));



