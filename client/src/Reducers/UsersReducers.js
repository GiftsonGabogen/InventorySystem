import { FetchAllUsers, UnMountAlert, RegisterUser, DeleteUsers, UpdateUser } from "../Actions/Actions";

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
        console.log(action.payload.user);
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
    case UpdateUser:
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
    case DeleteUsers:
      if (action.payload.success === true) {
        let filteredUsers = state.Users.filter(user => user._id !== action.payload.User._id);
        return {
          ...state,
          Users: [...filteredUsers],
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
