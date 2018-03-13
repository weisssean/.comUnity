import * as types from "./actionTypes";
import {beginAjaxCall} from "./ajaxStatusActions";
import axios from "axios";


// axios.defaults.withCredentials = true;

export function selectUserSuccess(user) {
    return {type: types.SET_USER_SUCCESS, user};
}


export function setUserFromGoogle(user) {

    return (dispatch, getState) => {

        return dispatch(selectUserSuccess(user));

        // });
    };
}

export function getCurrentUser() {

    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        const url = "http://localhost:9090/user";
        // console.log(axios.defaults);
        // return new Promise((resolve, reject) => {
            axios.get(url, {
                params: {},
                withCredentials: true
            }).then(response => {
                if (response.data.user)
                    dispatch(selectUserSuccess(Object.assign([], response.data.user)));
            }).catch((error) => {
                throw(error);
                //

                // reject(`User not found! ${error}`);
            });
        // });
    };
}