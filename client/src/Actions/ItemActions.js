import {
  FetchItem,
  FetchItems,
  UpdateItem,
  DeleteItem,
  EditItem,
  AddStock,
  AddCategory,
  FetchCategories,
  FetchAll
} from "./Actions";

import axios from "axios";
let Token = localStorage.getItem("Authorization");

export const FetchAllAction = () => dispatch => {
  axios.get("/api/items").then(items => {
    axios.get("/api/items/Category").then(categories => {
      dispatch({
        type: FetchAll,
        items: items.data,
        categories: categories.data
      });
    });
  });
};

export const FetchItemsAction = () => dispatch => {
  axios.get("/api/items").then(items =>
    dispatch({
      type: FetchItems,
      payload: items.data
    })
  );
};

export const FetchCategoriesAction = () => dispatch => {
  axios.get("/api/items/Category").then(categories =>
    dispatch({
      type: FetchCategories,
      payload: categories.data
    })
  );
};

export const FetchItemAction = id => dispatch => {
  axios.get(`/api/items/${id}`).then(item =>
    dispatch({
      type: FetchItem,
      payload: item.data
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

export const AddCategoryAction = data => dispatch => {
  axios
    .post("/api/items/AddCategory", data, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(items =>
      dispatch({
        type: AddCategory,
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
    .put("/api/items/AddStock", data, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(item =>
      dispatch({
        type: AddStock,
        payload: item.data
      })
    );
};

export const EditItemAction = data => dispatch => {
  console.log(data);
  axios
    .put("/api/items/EditItem", data, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(item =>
      dispatch({
        type: EditItem,
        payload: item.data
      })
    );
};
