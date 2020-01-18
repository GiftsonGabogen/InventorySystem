import { FetchLocations, AddLocations, DeleteLocations } from "./Actions";

import axios from "axios";

export const FetchLocationsAction = () => dispatch => {
  axios.get("/api/locations").then(locations => {
    dispatch({
      type: FetchLocations,
      payload: locations.data
    });
  });
};

export const AddLocationsAction = data => dispatch => {
  let Token = localStorage.getItem("Authorization");
  axios
    .post(`/api/locations`, data, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(locations => {
      dispatch({
        type: AddLocations,
        payload: locations.data
      });
    });
};

export const DeleteLocationsAction = id => dispatch => {
  axios.delete(`/api/locations/${id}`).then(locations => {
    dispatch({
      type: DeleteLocations,
      payload: locations.data
    });
  });
};
