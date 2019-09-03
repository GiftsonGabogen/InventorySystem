import {
  FetchItem,
  FetchItems,
  UpdateItem,
  DeleteItem,
  EditItem,
  AddStock
} from "./Actions";

import axios from "axios";
let Token = localStorage.getItem("Authorization");

export const FetchItemsAction = () => dispatch => {
  axios
    .get("/api/items")
    .then(res => res.json())
    .then(items =>
      dispatch({
        type: FetchItems,
        payload: items
      })
    );
};

export const FetchItemAction = id => dispatch => {
  axios
    .get(`/api/items/${id}`)
    .then(res => res.json())
    .then(item =>
      dispatch({
        type: FetchItem,
        payload: item
      })
    );
};

export const AddItemAction = data => dispatch => {
  axios
    .post("/api/items/AddItem", data, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(items =>
      dispatch({
        type: UpdateItem,
        payload: items.data
      })
    );
};

export const DeleteItemAction = id => dispatch => {
  axios
    .delete(`/api/items/${id}`)
    .then(res => res.json())
    .then(item =>
      dispatch({
        type: DeleteItem,
        payload: item.data
      })
    );
};

export const AddStockAction = data => dispatch => {
  axios
    .put("/api/items/AddStock", data)
    .then(res => res.json())
    .then(item =>
      dispatch({
        type: AddStock,
        payload: item.data
      })
    );
};

export const EditItemAction = data => dispatch => {
  axios
    .put("/api/items/EditItem", data)
    .then(res => res.json())
    .then(item =>
      dispatch({
        type: EditItem,
        payload: item.data
      })
    );
};
