import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// var {google} = require('googleapis');

import gapi from 'gapi-client';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
