import * as types from "./actionTypes";
import LocationsApi from "../api/LocationsApi";
import mockLocationApi from "../api/mockLocationApi";
import {beginAjaxCall} from "./ajaxStatusActions";

let api = process.env.NODE_ENV === "production" ? LocationsApi : mockLocationApi;

export function loadLocationsSuccess(locations) {
    return {type: types.LOAD_LOCATIONS_SUCCESS, locations};
}

export function selectLocationSuccess(loc) {
    return {type: types.SELECT_LOCATION_SUCCESS, loc};
}

export function selectLocationError() {
    return {type: types.SELECT_LOCATION_ERROR};
}

export function createLocationSuccess(loc) {
    return {type: types.CREATE_LOCATION_SUCCESS, loc};

}

export function updateLocationSuccess(loc) {
    return {type: types.UPDATE_LOCATION_SUCCESS, loc};

}

export function ajaxCallSuccess() {
    return {type: types.AJAX_CALL_SUCCESS};
}

export function loadLocations() {

    return function (dispatch) {
        dispatch(beginAjaxCall());
        return api.getAllLocations().then(locations => {
            let filtered = locations.filter(l => parseInt(l.status) !== 99);
            dispatch(loadLocationsSuccess(filtered));
        }).catch(error => {
            throw(error);
        });
    };
}

export function getLocationById(id) {

    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        const locations = getState().locations;

        return new Promise((resolve, reject) => {

            const loc = locations.filter(l => l.uuid === id)[0];
            if (loc) {
                dispatch(selectLocationSuccess(loc));
                resolve(loc);
            }
            else
                throw("Location not found");
        });
    };
}


export function saveLocation(loc, uuid) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        if (uuid) {
            loc.uuid = uuid;
            return api.editLocation(loc).then(loc => {
                dispatch(updateLocationSuccess(loc));
            }).catch(error => {
                throw(error);
            })
        } else {
            return api.addLocation(loc).then(loc => {
                dispatch(createLocationSuccess(loc));
            }).catch(error => {
                throw(error);
            })

        }
    }
}
export function saveComment(comment) {
    return function (dispatch) {
        return api.saveComment(comment).then(comments => {
            return comments;
        }).catch(error => {
            throw(error);
        })
    }
}


export function getUserByUID(uId) {
    return function (dispatch) {
        return api.getUserByUId(uId).then(user => {
            return user;
        }).catch(error => {
            throw(error);
        })
    }
}
export function getCommentsByLocationId(locId) {
    return function (dispatch) {
        return api.getCommentsByLocationId(locId).then(comments => {
            return comments;
        }).catch(error => {
            throw(error);
        })
    }
}

export function callSuccess() {
    return function (dispatch, getState) {
        dispatch(ajaxCallSuccess());
    };
}


//
// export function reset() {
//   return function (dispatch) {
//     // dispatch(beginAjaxCall());
//     // dispatch(loadRoutesSuccess([]));
//     // dispatch(selectRoute({}));
//     // dispatch(loadRouteReadsSuccess([], []));
//     // dispatch(loadTestPointsSuccess([]));
//     // dispatch(loadTestPointReadsSuccess([], []));
//
//   };
// }
