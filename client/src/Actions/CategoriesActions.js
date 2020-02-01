import { FetchCategories, AddCategories, DeleteCategories, EditCategories } from "./Actions";

import axios from "axios";

export const FetchCategoriesAction = () => dispatch => {
  axios.get("/api/categories").then(categories => {
    dispatch({
      type: FetchCategories,
      payload: categories.data
    });
  });
};

export const AddCategoriesAction = data => dispatch => {
  let Token = localStorage.getItem("Authorization");
  axios
    .post(`/api/categories`, data, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(categories => {
      dispatch({
        type: AddCategories,
        payload: categories.data
      });
    });
};

export const EditCategoriesAction = data => dispatch => {
  let Token = localStorage.getItem("Authorization");
  axios
    .post(`/api/categories/update`, data, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(categories => {
      dispatch({
        type: EditCategories,
        payload: categories.data
      });
    });
};

export const DeleteCategoriesAction = id => dispatch => {
  axios.delete(`/api/categories/${id}`).then(categories => {
    dispatch({
      type: DeleteCategories,
      payload: categories.data
    });
  });
};
