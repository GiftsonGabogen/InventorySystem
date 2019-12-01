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
        if (action.payload.Users.length !== 0) {
          let Users = action.payload.Users.filter(user => user.Type !== "SuperAdmin");
          console.log(Users);
          return {
            ...state,
            Users: Users,
            Success: true
          };
        }
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
          Users: [...state.Users, action.payload.user],
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
      };
    default:
      return {
        ...state
      };
  }
};
