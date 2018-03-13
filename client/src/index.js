import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";

import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';
import "../node_modules/toastr/build/toastr.min.css";

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from "./store/configureStore.dev";
import {loadLocations} from "./actions/locationsActions";
import {getCurrentUser} from "./actions/userActions";


const store = configureStore();

store.dispatch(loadLocations());
store.dispatch(getCurrentUser());


ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
    document.getElementById('root')
);


// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
