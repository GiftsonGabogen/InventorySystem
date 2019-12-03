import { FetchAllInventories, AddInventories, RemoveInventories, BorrowInventories, BackInventories } from "./Actions";

import axios from "axios";

export const FetchAllInventoriesAction = () => dispatch => {
  axios.get("/api/inventories").then(inventories => {
    dispatch({
      type: FetchAllInventories,
      payload: inventories.data
    });
  });
};

export const AddInventoriesAction = data => dispatch => {
  let Token = localStorage.getItem("Authorization");
  axios
    .post("/api/inventories/AddInventory", data, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(inventories => {
      dispatch({
        type: AddInventories,
        payload: inventories.data
      });
    });
};
