import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
// import users from './usersReducer';
import user from './userReducer';
// import account from './accountReducer';
import locations from './locationsReducer';

const rootReducer = combineReducers({
    ajaxCallsInProgress,
    locations,
    user,
    // routes
});

export default rootReducer;
