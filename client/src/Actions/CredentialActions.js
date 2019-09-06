import { Login, AuthCheck } from "./Actions";

import axios from "axios";
let Token = localStorage.getItem("Authorization");

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

export const AuthCheckAction = () => dispatch => {
  axios
    .post(
      `/api/users/AuthCheck`,
      {},
      {
        headers: { Authorization: "Bearer " + Token }
      }
    )
    .then(user => {
      dispatch({
        type: AuthCheck,
        payload: user.data
      });
    });
};
