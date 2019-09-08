import {
  FetchItem,
  FetchItems,
  UpdateItem,
  DeleteItem,
  AddCategory,
  FetchCategories,
  FetchAll,
  DeleteCategory
} from "./Actions";

import axios from "axios";
let Token = localStorage.getItem("Authorization");

export const FetchAllAction = () => dispatch => {
  axios.get("/api/items").then(items => {
    axios.get("/api/items/Category").then(categories => {
      axios.get("/api/sales").then(sales => {
        console.log(sales.data);
        dispatch({
          type: FetchAll,
          items: items.data,
          categories: categories.data,
          sales: sales.data
        });
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
    .delete(`/api/items/${id}`, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(item =>
      dispatch({
        type: DeleteItem,
        payload: item.data
      })
    );
};

export const DeleteCategoryAction = id => dispatch => {
  axios
    .delete(`/api/items/Category/${id}`, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(item =>
      dispatch({
        type: DeleteCategory,
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
        type: UpdateItem,
        payload: item.data
      })
    );
};

export const EditItemAction = data => dispatch => {
  axios
    .put("/api/items/EditItem", data, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(item =>
      dispatch({
        type: UpdateItem,
        payload: item.data
      })
    );
};
