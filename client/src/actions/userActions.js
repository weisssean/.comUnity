import * as types from "./actionTypes";
import {beginAjaxCall} from "./ajaxStatusActions";
import axios from "axios";
import restApi from "../api/restApi";
import {loadLocationsSuccess} from "./locationsActions";


// axios.defaults.withCredentials = true;

export function selectUserSuccess(user) {
  return {type: types.SET_USER_SUCCESS, user};
}


export function setUserFromGoogle(user) {
  return (dispatch, getState) => {
    return dispatch(selectUserSuccess(user));
  };
}

export function getCurrentUser() {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    const url = "http://localhost:9090/user";
    axios
      .get(url, {
        params: {},
        withCredentials: true
      })
      .then(response => {
        if (response.data)
          dispatch(selectUserSuccess(Object.assign([], response.data)));
      })
      .catch((error) => {
        throw(error);
      });
  };
}
