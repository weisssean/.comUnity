import React, {Component} from 'react';
import '../css/App.css';
import Navigation from "./common/Navigation";
import Home from "./Home/Home";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NewLocationForm from "./NewLocation/NewLocationForm";
import LoginModal from "./common/LoginModal";
import LocationsList from "./MyLocations/LocationsList";
// const {google} = require('googleapis');

// import {google} from 'googleapis';
// const google = require('googleapis');
// var {google} = require('googleapis');
// window.gapi.load('auth2', function () {
//     window.gapi.auth2.init({
//
//         client_id: '1028091578492-r8k4erb004a3mm35gh67rfm8nrm2gaca.apps.googleusercontent.com',
//         scope: 'profile',
//         fetch_basic_profile: true,
//         prompt: "none"
//     }).then((resp, err) => {
//
//         if (resp.isSignedIn.get()) {
//             console.log("currentUser", resp.currentUser.get().getBasicProfile());
//
//         }
//
//     });
// });

// TypeError: Cannot convert undefined or null to object
class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loginModal: false,
            sideNavOpen: false
        };

        this.toggleLogin = this.toggleLogin.bind(this);
    }

    toggleLogin() {
        this.setState({
            loginModal: !this.state.loginModal
        });
    }

    render() {
        return (

            <Router>


                <div className="App">
                    <LoginModal className="login-modal"
                                show={this.state.loginModal}
                                toggleModule={this.toggleLogin}/>
                    <header className="App-header">
                        <Navigation toggleLogin={this.toggleLogin} toggleSideNav={this.toggleSideNav}/>

                    </header>
                    <Switch>
                        <Route exact path="/add-location" component={NewLocationForm}/>
                        <Route exact path="/edit-location/:locId" component={NewLocationForm}/>
                        <Route exact path="/my-locations" component={LocationsList}/>
                        <Route exact path={['/', '/:locId']} component={props => <Home {...props}/>}/>



                    </Switch>

                </div>

            </Router>
        );
    }
}

export default App;
