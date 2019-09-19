import { RegisterUser, FetchAllUsers } from "./Actions";

import axios from "axios";
let Token = localStorage.getItem("Authorization");

export const RegisterUserAction = data => dispatch => {
  const Data = new FormData();
  Data.append("Name", data.Name);
  Data.append("Username", data.Username);
  Data.append("Password", data.Password);
  Data.append("ConfirmationPassword", data.ConfirmPassword);
  Data.append("Type", data.Type);
  Data.append("ProfilePicture", data.ProfilePicture);
  axios
    .post("/api/users/register", Data, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(users =>
      dispatch({
        type: RegisterUser,
        payload: users.data
      })
    );
};

export const FetchAllUsersAction = () => dispatch => {
  axios.get("/api/users").then(users =>
    dispatch({
      type: FetchAllUsers,
      payload: users.data
    })
  );
};
