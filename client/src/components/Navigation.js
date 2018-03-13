import React from 'react';
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userActions from "../actions/userActions";
import {
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarToggler,
    NavItem,
    UncontrolledDropdown
} from 'reactstrap';

// import {GoogleLogout} from 'react-google-login';
import anon from '../assets/images/anonymus.png'

import Fa from 'react-fontawesome';
import UserPanel from "./Home/UserPanel";

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }


    onUserImageError(e) {
        e.currentTarget.src = "../../assets/images/anonymus.png";
    }

    render() {
        const {user, toggleSideNav} = this.props;

        return (
            <div>
                <Navbar color="faded" light expand>
                    <Link to="/"  className="navbar-brand mr-auto">.comUnity</Link>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav className="ml-auto " navbar>
                            <NavItem className="hide_small">
                                <form className="nav-link form-inline my-2 my-lg-0">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" style={{
                                        display: "inline-block",
                                        width: "auto",
                                        verticalAlign: "middle",
                                        marginRight: "0.5rem"
                                    }}
                                           aria-label="Search"/>
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><Fa
                                        name="search"/>

                                    </button>
                                </form>
                            </NavItem>
                            {/*<NavItem className="show_small">*/}
                            {/*<div className="nav-link">*/}
                            {/*<div className="g-signin2" data-onsuccess="onSignIn">&nbsp;</div>*/}
                            {/*</div>*/}
                            {/*/!*<div className="nav-link" onClick={this.props.toggleLogin}>Login</div>*!/*/}
                            {/*<span className="sr-only">(current)</span>*/}

                            {/*</NavItem>*/}
                            {/*<NavItem className="show_small">*/}
                            {/*<Link to="/add-location" className="nav-link">Add New Location <span*/}
                            {/*className="sr-only">(current)</span>*/}
                            {/*</Link>*/}
                            {/*</NavItem>*/}
                            <UncontrolledDropdown nav>
                                <DropdownToggle nav>

                                    <img className="user-image"
                                         onError={this.onUserImageError}//e => e.src = "./assets/images/anonymus.png"
                                         src={user.photos&&user.photos[0] ? user.photos[0].value : anon}
                                    />


                                    {/*<div className="navbar-toggler btn btn-outline-light" style={{display: "block"}}>*/}
                                    {/*<div className="navbar-toggler-icon"/>*/}
                                    {/*</div>*/}
                                    {/*Options*/}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {/*<DropdownItem className="show_small">*/}
                                    {/*<NavItem>*/}
                                    {/*<form className="nav-link form-inline my-2 my-lg-0">*/}
                                    {/*<input className="form-control mr-sm-2" type="search" placeholder="Search"*/}
                                    {/*aria-label="Search"/>*/}
                                    {/*<div className="btn btn-outline-success my-2 my-sm-0" type="submit"><Fa name="search"/>*/}

                                    {/*</div>*/}
                                    {/*</form>*/}
                                    {/*</NavItem>*/}
                                    {/*</DropdownItem>*/}
                                    <div className="dropdown-item disabled">
                                        <UserPanel/>
                                    </div>
                                    <DropdownItem divider/>

                                    {/*<DropdownItem>*/}
                                    {/*/!*<div className="nav-link">*!/*/}
                                    {/*<div className="g-signin2" data-onsuccess="onSignIn">&nbsp;</div>*/}
                                    {/*/!*</div>*!/*/}
                                    {/*/!*<div className="nav-link">*!/*/}
                                    {/*/!*<div className="g-signin2" data-onsuccess="onSignIn">&nbsp;</div>*!/*/}
                                    {/*/!*</div>*!/*/}
                                    {/*/!*<div className="nav-link" onClick={this.props.toggleLogin}>Login</div>*!/*/}
                                    {/*<span className="sr-only">(current)</span>*/}
                                    {/*</DropdownItem>*/}
                                    <DropdownItem>
                                        <Link to="/my-locations" className="nav-link">My Locations <span
                                            className="sr-only">(current)</span>
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem divider/>
                                    <DropdownItem>
                                        <Link to="/add-location" className="nav-link">Add New Location <span
                                            className="sr-only">(current)</span>
                                        </Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>


                            {/*<li className="nav-item">*/}
                            {/*<Link to="/add-location" className="nav-link">Add New Location <span*/}
                            {/*className="sr-only">(current)</span>*/}
                            {/*</Link>*/}
                            {/*</li>*/}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }

}


Navigation.propTypes = {
    // toggleSideNav: PropTypes.func.isRequired
    // showLocationModal: PropTypes.bool
};

//redux connect and map functions
function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));