import { Login, AuthCheck, Logout } from "../Actions/Actions";

const initialState = {
  Login: false,
  Success: false,
  message: "",
  Username: "",
  Type: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Login:
      if (action.payload.success === true) {
        return {
          ...state,
          Login: true,
          Success: true,
          Username: action.payload.User.Username,
          Type: action.payload.User.Type
        };
      } else {
        return {
          ...state,
          message: action.payload.message
        };
      }
    case Logout:
      return {
        ...state,
        Login: false,
        Success: false,
        message: "",
        Username: "",
        Type: ""
      };
    case AuthCheck:
      if (action.payload.success === true) {
        return {
          ...state,
          Login: true,
          Success: true,
          Username: action.payload.User.Username,
          Type: action.payload.User.Type
        };
      } else {
        return {
          ...state,
          message: action.payload.message
        };
      }
    default:
      return {
        ...state
      };
  }
};
