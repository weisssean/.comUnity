import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './buttons.css';
import FontAwesome from 'react-fontawesome';
import {Button} from 'reactstrap';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to .ComUnity</h1>
                </header>

                <div className="App-intro">
                    <a className="btn-g-login" href="http://localhost:9090/auth/google"></a>
                    <br/>


                    <div className="btn-fb-login-holder">
                    <a class="loginBtn loginBtn--facebook" href="http://localhost:9090/auth/facebook">
                        Sign in with Facebook
                    </a>
                    </div>
                    {/*<Button className="btn-fb-login-holder">*/}
                        {/*<a className="btn-fb-login" href="http://localhost:9090/auth/facebook">*/}
                            {/*<FontAwesome*/}
                                {/*name="facebook-square"*/}
                                {/*style={{color: "white"}}*/}
                                {/*size="2x"//{this.props.showSideNav?"2x":"1x"}*/}
                            {/*/>Sign in</a>*/}
                    {/*</Button>*/}



                    {/*<button class="loginBtn loginBtn--google">*/}
                        {/*Login with Google*/}
                    {/*</button>*/}

                </div>
            </div>
        );
    }
}

export default App;
