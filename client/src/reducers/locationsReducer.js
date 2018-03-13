import * as types from "../actions/actionTypes";
import initialState from "./initialState";

function compare(a,b) {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
  return 0;

}

export default function locationsReducer(state = initialState.locations, action) {
  switch (action.type) {
      // case types.SELECT_LOCATION_SUCCESS:
      //     return  Object.assign({},action.location);
      case types.LOAD_LOCATIONS_SUCCESS:
          return  Object.assign([],[...action.locations].sort(compare));
    case types.CREATE_LOCATION_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.location)
      ].sort(compare);
    case types.UPDATE_LOCATION_SUCCESS:
      return [
        ...state.filter(location => location.uuid !== action.location.uuid),
        Object.assign({}, action.location)
      ].sort(compare);
    default:
      return state.sort(compare);
  }
}
