import { UpdateSales } from "./Actions";

import axios from "axios";

export const AddSoldAction = data => dispatch => {
  let Token = localStorage.getItem("Authorization");
  axios
    .post("/api/sales/", data, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(sales =>
      dispatch({
        type: UpdateSales,
        payload: sales.data,
        quantity: data.Quantity
      })
    );
};
