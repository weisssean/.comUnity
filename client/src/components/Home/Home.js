import React, {Component} from 'react';
import MapHolder from "./MapHolder";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as locationsActions from "../../actions/locationsActions";
import {bindActionCreators} from "redux";
import toastr from "toastr";
import LocationModal from "./LocationModal"
import SideNav from "./SideNav/SideNav";

class Home extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            locationModal: props.match.params.locId!== undefined,
            selectedLocation: {}
        };

        this.toggleLocationModal = this.toggleLocationModal.bind(this);
        this.showLocationModal = this.showLocationModal.bind(this);

    }

    toggleLocationModal(show) {
        this.setState({
            locationModal: show === true ? show : !this.state.locationModal
        });
        if( !show )
            this.props.history.push(`/`);

    }

    componentDidMount() {
        if (this.state.locationModal) {
            if (this.props.locations.length > 0) {
                this.showLocationModal(this.props.match.params.locId);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.locId && this.props.match.params.locId !== nextProps.match.params.locId) {
            this.showLocationModal(nextProps.match.params.locId);
        }

        if (this.props.locations !== nextProps.locations && this.props.match.params.locId) {
            this.showLocationModal(this.props.match.params.locId);
        }
    }

    showLocationModal(locId) {
        this.props.actions.getLocationById(locId).then(loc => {
            this.setState({selectedLocation: loc});
            this.toggleLocationModal(true);
        }).catch(exception => {
            toastr.error(exception);
            this.props.history.push("/");
        });
    }

    render() {
        return (
            <div style={{position: "relative", height: "calc(100% - 54px)", width: "100%"}}>
                <LocationModal loc={this.state.selectedLocation} show={this.state.locationModal}
                               toggleModule={this.toggleLocationModal}/>
                <div style={{height: "100%", width: "100%"}}>
                    <SideNav toggleDrawer={this.props.toggleSideNav} showSideNav={this.props.sideNavOpen}/>

                    <div style={{height: "100%", width: "calc(100% - 55px)", marginLeft:"55px"}}>
                        <MapHolder/>
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    // showLocationModal: PropTypes.bool,
    // toggleSideNav: PropTypes.func.isRequired,
    // sideNavOpen: PropTypes.bool.isRequired
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
