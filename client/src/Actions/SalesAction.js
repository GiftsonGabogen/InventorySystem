import { UpdateSales } from "./Actions";

import axios from "axios";
let Token = localStorage.getItem("Authorization");

export const AddSoldAction = data => dispatch => {
  console.log(data);
  axios
    .post("/api/sales/", data, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(sales =>
      dispatch({
        type: UpdateSales,
        payload: sales.data
      })
    );
};
