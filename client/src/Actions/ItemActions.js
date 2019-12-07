import {
  FetchItem,
  FetchItems,
  UpdateItem,
  DeleteItem,
  DeleteItemMultiple,
  AddCategory,
  FetchCategories,
  FetchAll,
  DeleteCategory
} from "./Actions";

import axios from "axios";

export const FetchAllAction = () => dispatch => {
  axios.get("/api/items").then(items => {
    axios.get("/api/items/Category").then(categories => {
      axios.get("/api/sales").then(sales => {
        axios.get("/api/inventories").then(inventories => {
          dispatch({
            type: FetchAll,
            items: items.data,
            categories: categories.data,
            sales: sales.data,
            inventories: inventories.data
          });
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
  let Token = localStorage.getItem("Authorization");
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
  let Token = localStorage.getItem("Authorization");
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
  let Token = localStorage.getItem("Authorization");
  axios
    .delete(`/api/items/individual/${id}`, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(item =>
      dispatch({
        type: DeleteItem,
        payload: item.data
      })
    );
};

export const DeleteItemMultipleAction = data => dispatch => {
  let Token = localStorage.getItem("Authorization");
  axios
    .post(`/api/items/multiple`, data, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(item => {
      console.log(item);
      dispatch({
        type: DeleteItemMultiple,
        payload: item.data
      });
    });
};

export const DeleteCategoryAction = id => dispatch => {
  let Token = localStorage.getItem("Authorization");
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
  let Token = localStorage.getItem("Authorization");
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
  let Token = localStorage.getItem("Authorization");
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
