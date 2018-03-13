import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import * as locationsActions from "../../actions/locationsActions";
import GoogleMapView from "../GoogleMapView";

class MapHolder extends Component {

    render() {

        return (
            <GoogleMapView
                locations={this.props.locations}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAQzy1qHs-KTeLmP5akKRBNObB0ivMLmGk&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{height: `100%`, width:"100%"}}/>}
                containerElement={<div style={{height: `100%`, width:"100%"}}/>}
                mapElement={<div style={{height: `100%`, width:"100%"}}/>}
            />
        );
    }
}


MapHolder.propTypes = {
    locations: PropTypes.array.isRequired
};

//redux connect and map functions
function mapStateToProps(state, ownProps) {
    return {
        locations: state.locations
    };

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(locationsActions, dispatch)
    };
}


export default  connect(mapStateToProps, mapDispatchToProps)(MapHolder);


