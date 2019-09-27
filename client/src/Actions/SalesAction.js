import { UpdateSales, FetchAllSales, FetchAllDaySales } from "./Actions";

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


export const FetchAllSalesAction = (Month = undefined) => dispatch => {
  let url
  let MonthPayload
  if (Month === undefined) {
    MonthPayload = false
    url = `/api/sales`
  } else {
    MonthPayload = true
    url = `/api/sales/bymonth/${Month}`
  }
  axios
    .get(url)
    .then(sales =>
      dispatch({
        type: FetchAllSales,
        payload: sales.data,
        Month: MonthPayload
      })
    );
};

export const FetchAllDaySalesAction = (date) => dispatch => {
  axios
    .get(`/api/sales/byday/${date}`)
    .then(sales => dispatch({
      type: FetchAllDaySales,
      payload: sales.data,
    }))
}
