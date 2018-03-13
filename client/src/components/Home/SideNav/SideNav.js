import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as userActions from "../../../actions/userActions";
import {Link, withRouter} from 'react-router-dom';
import {Button, Col, ListGroup, ListGroupItem, Row, Tooltip} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import '../../../css/side-nav.css';
import LocationsList from './LocationsList';
import beehive from '../../../assets/images/icons/beehive2.png'


class SideNav extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tooltipOpen: 0,
            sideNavOpen: false
        };

        this.toggleTooltip = this.toggleTooltip.bind(this);
        this.toggleSideNav = this.toggleSideNav.bind(this);

    }

    toggleSideNav() {
        this.setState({sideNavOpen: !this.state.sideNavOpen})
    }

    toggleTooltip(n) {
        if (n === this.state.tooltipOpen) {
            this.setState({tooltipOpen: 0});
        } else {
            this.setState({tooltipOpen: n});
        }
    }

    goHome() {
        window.location.href = "https://" + window.location.hostname;
    }

    render() {
        const {user, users, account} = this.props;
        return (
            <div id="sidebar" className={this.state.sideNavOpen ? "sidenav show" : "sidenav"}>
                <div className="reporting_side_container container-fluid ">

                    <Row style={{marginTop: "10px", marginBottom: "10px"}}>
                        <Col xs="9">
                            <div>
                                <img
                                    src={beehive}
                                    placeholder="logo"
                                    style={{width: "60px", height: "60px", float: "left", marginRight: "10px"}}/>
                            </div>
                        </Col>
                        <Col xs="3">
                            <Button size="sm" outline color="warning" onClick={this.toggleSideNav}
                                    style={{float: "right"}}>
                                <FontAwesome
                                    name="bars"
                                /></Button>
                        </Col>
                    </Row>
                    <LocationsList/>
                </div>

                <ListGroup className="nav-links-list">
                    <Link to="/add-location">
                        <ListGroupItem>
                            <span className="txt-nav-link">
                                <FontAwesome
                                    name="plus"
                                    style={{color: "forestgreen"}}
                                    // size="2x"//{this.props.showSideNav?"2x":"1x"}
                                />&nbsp;Add Location
                            </span>
                            <span>
                                 <button type="button" id="btn-add" className="btn btn-sm btn-light btn-nav-link"
                                         onClick={() => {
                                         }}>
                                <FontAwesome
                                    name="plus"
                                    style={{color: "forestgreen"}}
                                    // size="2x"//{this.props.showSideNav?"2x":"1x"}
                                />
                            </button>
                                <Tooltip placement="right" isOpen={this.state.tooltipOpen === "add"}
                                         target="btn-add"
                                         toggle={() => {
                                             this.toggleTooltip("add");
                                         }}>
                                    Add Location
                                </Tooltip>
                            </span>
                        </ListGroupItem>
                    </Link>
                    <Link to="/settings">
                        <ListGroupItem>
                            <span className="txt-nav-link">
                                <FontAwesome
                                    name="cog"
                                    style={{color: "forestgreen"}}
                                    // size="2x"//{this.props.showSideNav?"2x":"1x"}
                                />&nbsp;Settings
                            </span>
                            <span>
                                 <button type="button" id="btn-settings" className="btn btn-sm btn-light btn-nav-link"
                                         onClick={() => {
                                         }}>
                                <FontAwesome
                                    name="cog"
                                    style={{color: "forestgreen"}}
                                     //size="2x"//{this.props.showSideNav?"2x":"1x"}
                                />
                            </button>
                                <Tooltip placement="right" isOpen={this.state.tooltipOpen === "settings"}
                                         target="btn-settings"
                                         toggle={() => {
                                             this.toggleTooltip("settings");
                                         }}>
                                    Settings
                                </Tooltip>
                            </span>
                        </ListGroupItem>
                    </Link>
                </ListGroup>
            </div>
        );
    }
}

SideNav.propTypes = {
    showSideNav: PropTypes.bool,
    toggleDrawer: PropTypes.func,
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

//redux connect and map functions
function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
    };

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideNav));

