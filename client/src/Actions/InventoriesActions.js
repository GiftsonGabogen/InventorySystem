import {
  FetchAllInventories,
  AddInventories,
  BorrowInventories,
  BackInventories,
  FetchInventory,
  FetchAllInventoryLogs,
  DeleteInventory,
  FetchAllInventoryModifies
} from "./Actions";

import axios from "axios";

export const FetchAllInventoriesAction = () => dispatch => {
  axios.get("/api/inventories").then(inventories => {
    dispatch({
      type: FetchAllInventories,
      payload: inventories.data
    });
  });
};

export const FetchAllInventoryLogsAction = () => dispatch => {
  axios.get("/api/inventories/inventorylog").then(inventories => {
    dispatch({
      type: FetchAllInventoryLogs,
      payload: inventories.data
    });
  });
};

export const FetchAllInventoryModifiesAction = () => dispatch => {
  axios.get("/api/inventories/modifies").then(inventories => {
    dispatch({
      type: FetchAllInventoryModifies,
      payload: inventories.data
    });
  });
};

export const FetchInventoryAction = id => dispatch => {
  axios.get(`/api/inventories/${id}`).then(inventories => {
    dispatch({
      type: FetchInventory,
      payload: inventories.data
    });
  });
};

export const AddInventoriesAction = data => dispatch => {
  const Data = new FormData();
  Data.append("Name", data.Name);
  let Images = [...data.InventoryImage];
  Images.map(file => Data.append("InventoryImage", file));
  Data.append("From", data.From);
  Data.append("PricePerUnit", data.PricePerUnit);
  Data.append("Quantity", data.Quantity);
  Data.append("Location", data.Location);
  Data.append("Category", data.Category);
  let Token = localStorage.getItem("Authorization");
  axios
    .post("/api/inventories/AddInventory", Data, {
      headers: { Authorization: "Bearer " + Token, "Content-Type": "multipart/form-data" }
    })
    .then(inventories => {
      dispatch({
        type: AddInventories,
        payload: inventories.data
      });
    });
};

export const AddImageAction = data => dispatch => {
  let Data = new FormData();
  Data.append("id", data.id);
  Data.append("Method", data.Method);
  let Images = [...data.AddImage];
  Images.map(file => Data.append("AddImage", file));
  let Token = localStorage.getItem("Authorization");
  axios
    .post(`/api/inventories/AddImage`, Data, {
      headers: { Authorization: "Bearer " + Token, "Content-Type": "multipart/form-data" }
    })
    .then(inventories => {
      dispatch({
        type: BorrowInventories,
        payload: inventories.data
      });
    });
};

export const DeleteImageAction = data => dispatch => {
  let Token = localStorage.getItem("Authorization");
  axios
    .post(`/api/inventories/DeleteImage`, data, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(inventories => {
      dispatch({
        type: BorrowInventories,
        payload: inventories.data
      });
    });
};

export const BorrowInventoriesAction = data => dispatch => {
  let Token = localStorage.getItem("Authorization");
  axios
    .put("/api/inventories/BorrowInventory", data, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(inventories => {
      dispatch({
        type: BorrowInventories,
        payload: inventories.data
      });
    });
};

export const BackInventoriesAction = data => dispatch => {
  let Token = localStorage.getItem("Authorization");
  axios
    .post("/api/inventories/inventorylog/AddInventoryLog", data, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(inventories => {
      dispatch({
        type: BackInventories,
        payload: inventories.data
      });
    });
};

export const DeleteInventoryAction = data => dispatch => {
  let id = data.id;
  let Token = localStorage.getItem("Authorization");
  axios
    .post(`/api/inventories/deleteInventory/${id}`, data, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(inventories => {
      dispatch({
        type: DeleteInventory,
        payload: inventories.data
      });
    });
};
