import React, {Component} from 'react';
import '../css/App.css';
import Navigation from "./common/TopNav/Navigation";
import Home from "./Home/Home";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NewLocationForm from "./NewLocation/NewLocationForm";
import LoginModal from "./common/LoginModal";
import LocationsList from "./MyLocations/LocationsList";
import toastr from 'toastr';
toastr.options.toastClass = 'toastr';

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
    return <Router>
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
  }
}

export default App;
