import { Login } from "../Actions/Actions";

const initialState = {
  Login: false,
  Success: false,
  message: "",
  Username: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Login:
      if (action.payload.success === true) {
        return {
          ...state,
          Login: true,
          Success: true,
          Username: action.payload.User.Username
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
