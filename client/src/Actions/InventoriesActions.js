import {
  FetchAllInventories,
  AddInventories,
  BorrowInventories,
  BackInventories,
  FetchInventory,
  FetchAllInventoryLogs
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
  Data.append("InventoryImage", data.InventoryImage);
  Data.append("From", data.From);
  Data.append("PricePerUnit", data.PricePerUnit);
  Data.append("Quantity", data.Quantity);
  Data.append("Location", data.Location);
  Data.append("Category", data.Category);
  let Token = localStorage.getItem("Authorization");
  axios
    .post("/api/inventories/AddInventory", Data, {
      headers: { Authorization: "Bearer " + Token }
    })
    .then(inventories => {
      dispatch({
        type: AddInventories,
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
