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
      //     return  Object.assign({},action.loc);
      case types.LOAD_LOCATIONS_SUCCESS:
          return  Object.assign([],[...action.locations].sort(compare));
    case types.CREATE_LOCATION_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.loc)
      ].sort(compare);
    case types.UPDATE_LOCATION_SUCCESS:
      return [
        ...state.filter(l => l._id !== action.loc._id),
        Object.assign({}, action.loc)
      ].sort(compare);
    default:
      return state.sort(compare);
  }
}
