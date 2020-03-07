import { Login, AuthCheck, Logout } from "../Actions/Actions";

const initialState = {
  Login: false,
  Success: false,
  message: "",
  Username: "",
  Name: "",
  Type: "",
  Password: ""
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
          Name: action.payload.User.Name,
          Type: action.payload.User.Type,
          Password: action.payload.Password
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
        Name: "",
        Type: "",
        Password: ""
      };
    case AuthCheck:
      if (action.payload.success === true) {
        return {
          ...state,
          Login: true,
          Success: true,
          Username: action.payload.User.Username,
          Name: action.payload.User.Name,
          Type: action.payload.User.Type,
          Password: action.payload.Password
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
