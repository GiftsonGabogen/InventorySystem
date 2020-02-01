import { FetchLocations, AddLocations, DeleteLocations, UnMountAlert, EditLocations } from "../Actions/Actions";

const initialState = {
  Success: false,
  message: "",
  Locations: [],
  Loading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UnMountAlert:
      return {
        ...state,
        message: "",
        Success: false,
        Loading: false
      };
    case FetchLocations:
      if (action.payload.success === true) {
        return {
          ...state,
          Locations: action.payload.Locations,
          Success: true,
          Loading: false
        };
      } else {
        return {
          ...state,
          Loading: false
        };
      }
    case DeleteLocations:
      if (action.payload.success === true) {
        let filteredLocations = state.Locations.filter(location => location._id !== action.payload.Location._id);
        return {
          ...state,
          Locations: [...filteredLocations],
          Success: true,
          message: action.payload.message,
          Loading: false
        };
      } else {
        return {
          ...state,
          Loading: false
        };
      }
    case EditLocations:
      if (action.payload.success === true) {
        let filteredLocations = state.Locations.filter(location => location._id !== action.payload.Location._id);
        return {
          ...state,
          Locations: [...filteredLocations, action.payload.Location],
          Success: true,
          message: action.payload.message,
          Loading: false
        };
      } else {
        return {
          ...state,
          Loading: false
        };
      }
    case AddLocations:
      if (action.payload.success === true) {
        return {
          ...state,
          Locations: [...state.Locations, action.payload.Location],
          message: action.payload.message,
          Success: true,
          Loading: false
        };
      } else {
        return {
          ...state,
          Loading: false
        };
      }
    default:
      return {
        ...state,
        Loading: false
      };
  }
};
