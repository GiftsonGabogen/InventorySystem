import { Login } from "./Actions";

import axios from "axios";

export const LoginAction = data => dispatch => {
  axios.post(`/api/users/login`, data).then(user => {
    localStorage.setItem("Authorization", user.data.token);
    console.log(user.data);
    dispatch({
      type: Login,
      payload: user.data
    });
  });
};
