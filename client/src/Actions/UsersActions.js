import { RegisterUser, FetchAllUsers, DeleteUsers } from "./Actions";

import axios from "axios";

export const RegisterUserAction = data => dispatch => {
  let Token = localStorage.getItem("Authorization");
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

export const DeleteUsersAction = id => dispatch => {
  let Token = localStorage.getItem("Authorization");
  axios
    .delete(`/api/users/${id}`, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(user =>
      dispatch({
        type: DeleteUsers,
        payload: user.data
      })
    );
};
