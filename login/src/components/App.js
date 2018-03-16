import React, {Component} from 'react';
import '../css/App.css';
import '../css/buttons.css';
import axios from 'axios';

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            local:false
        };
        this.validateIp = this.validateIp.bind(this);
        this.loginWithFacebook = this.loginWithFacebook.bind(this);
        this.loginWithGoogle = this.loginWithGoogle.bind(this);
        this.validateIp();


    }
    acceptedRegion = "MA";

    validateIp(){

        const url ="https://api.ipdata.co/";
        axios.get(url,{}).then(response=>{
            console.log("ip data:",response.data);
                this.setState({local:(response.data && this.acceptedRegion ===response.data.region_code)});

        }).catch(exception=>{

        });
    }
    loginWithGoogle(){
        if(this.state.local){
            window.location.href ="http://localhost:9090/auth/google";
        }else {
            alert("not a framinghammer")
        }
    }
    loginWithFacebook(){
        if(this.state.local){
            window.location.href ="http://localhost:9090/auth/facebook";
        }else {
            alert("not a framinghammer")
        }
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                    <h1 className="App-title">Welcome to .ComUnity</h1>
                </header>

                <div className="App-intro">
                    <button onClick={this.loginWithGoogle} className="btn-g-login" href="http://localhost:9090/auth/google"></button>
                    <br/>
                    <div className="btn-fb-login-holder">
                    <button onClick={this.loginWithFacebook} className="loginBtn loginBtn--facebook" href="http://localhost:9090/auth/facebook">
                        Sign in with Facebook
                    </button>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;
