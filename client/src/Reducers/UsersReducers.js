import { FetchAllUsers, UnMountAlert, RegisterUser } from "../Actions/Actions";

const initialState = {
  Success: false,
  message: "",
  Users: [],
  Sale: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FetchAllUsers:
      if (action.payload.success === true) {

        let Users = action.payload.Users.filter(user => user.Type !== "SuperAdmin")
        return {
          ...state,
          Users: Users,
          Success: true
        };
      } else {
        return {
          ...state
        };
      }
    case RegisterUser:
      if (action.payload.success === true) {

        return {
          ...state,
          message: action.payload.message,
          Success: true
        };
      } else {
        return {
          ...state,
          message: action.payload.message
        };
      }
    case UnMountAlert:
      return {
        ...state,
        Success: false,
        message: ""
      }
    default:
      return {
        ...state
      };
  }
};
