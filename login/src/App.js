import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

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
                    <a className="btn-fb-login" href="http://localhost:9090/auth/facebook">Facebook</a>
                </div>
            </div>
        );
    }
}

export default App;
