import * as types from "./actionTypes";
import restApi, {moveTempFiles} from "../api/restApi";
import {beginAjaxCall} from "./ajaxStatusActions";


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
    const url = '/locations';
    return restApi
      .get(url)
      .then(locations => {
        let filtered = locations.filter(l => parseInt(l.status) !== 99);
        dispatch(loadLocationsSuccess(filtered));
      })
      .catch(error => {
        throw(error);
      });
  };
}

export function getLocationById(id) {

  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    const locations = getState().locations;

    return new Promise((resolve, reject) => {

      const loc = locations.filter(l => l._id === id)[0];
      if (loc) {
        dispatch(selectLocationSuccess(loc));
        resolve(loc);
      }
      else
        reject("Location not found");
    });
  };
}

export function search(input) {
  return function (dispatch, getState) {
    let locations = getState().locations;

    //locations.filter

  }
}

export function saveLocation(loc) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    let url = '/locations/';
    if (loc._id) {
      url += loc._id;
      return restApi
        .put(url, {...loc})
        .then(loc => {
          // moveTempFiles();

          dispatch(updateLocationSuccess(loc.data));

        })
        .catch(error => {
          throw(error);
        });
    } else {
      return restApi
        .post(url, {...loc})
        .then(loc => {
          // moveTempFiles();
          dispatch(createLocationSuccess(loc.data));
        })
        .catch(error => {
          throw(error);
        })

    }
  }
}

export function saveComment(commentToSave, id) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      let url = '/comments/';
      if (id) {
        url += id;
        return restApi
          .put(url, {...commentToSave})
          .then(res => {
            resolve(res.data);
            // dispatch(updateLocationSuccess(loc));
          })
          .catch(error => {
            throw(error);
          });
      }
      else {
        restApi
          .post(url, {...commentToSave})
          .then(res => {
            resolve(res.data);
          }).catch(error => {
          throw(error);
        })
      }
    });
  }
}


export function getUserByUID(uid) {
  return function (dispatch) {
    const url = `/users/${uid}`;
    return restApi
      .get(url)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        throw(error);
      });
  }
}

export function getCommentsByLocationId(locationId) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    const url = '/comments';
    return restApi
      .get(url, {"locationId": locationId})
      .then(comments => {
        return comments;
      })
      .catch(error => {
        throw(error);
      });
  };
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
