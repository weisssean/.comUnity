import React, {Component} from 'react';
import '../css/App.css';
import '../css/buttons.css';
import axios from 'axios';
const DEV_MODE =true;

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      local: DEV_MODE
    };
    this.acceptedRegion = "MA";
  }

  componentDidMount() {
    if (!DEV_MODE)
    this.validateIp();
  }


  validateIp = () => {

    const url = "https://api.ipdata.co/?api-key=93d8b69f08af1d578d211ed73e30e3374bd557f4b282c76cc838ddd4";
    axios.get(url, {}).then(response => {
      console.log("ip data:", response.data);
      this.setState({local: (response.data && this.acceptedRegion === response.data.region_code)});

    }).catch(exception => {
      console.log("error:", exception);
    });
  };

  loginWithGoogle = () => {
    if (this.state.local) {
      window.location.href = "http://localhost:9090/auth/google";
    } else {
      alert("not a framinghammer")
    }
  };

  loginWithFacebook = () => {
    if (this.state.local) {
      window.location.href = "http://localhost:9090/auth/facebook";
    } else {
      alert("not a framinghammer")
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo"/>*/}
          <h1 className="App-title">Welcome to Frieborhood</h1>
        </header>

        <div className="App-intro">
          <button onClick={this.loginWithGoogle} className="btn-g-login"
                  href="http://localhost:9090/auth/google"></button>
          <br/>
          <div className="btn-fb-login-holder">
            <button onClick={this.loginWithFacebook} className="loginBtn loginBtn--facebook"
                    href="http://localhost:9090/auth/facebook">
              Sign in with Facebook
            </button>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
