import {
  FetchAll,
  FetchAllInventories,
  AddInventories,
  RemoveInventories,
  BorrowInventories,
  BackInventories,
  FetchInventory,
  FetchAllInventoryLogs,
  UnMountAlert
} from "../Actions/Actions";

const initialState = {
  Success: false,
  message: "",
  Inventories: [],
  Inventory: {},
  InventoryLogs: [],
  Loading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UnMountAlert:
      return {
        ...state,
        message: "",
        Success: false,
        Loading: false
      };
    case FetchAll:
      if (action.inventories.success === true) {
        if (action.inventories.Inventories.length !== 0) {
          return {
            ...state,
            Inventories: action.inventories.Inventories,
            Loading: false,
            Success: true
          };
        } else {
          return {
            ...state,
            Loading: false
          };
        }
      } else {
        return {
          ...state,
          Loading: false
        };
      }
    case FetchAllInventories:
      if (action.payload.success === true) {
        return {
          ...state,
          Inventories: action.payload.Inventories,
          Success: true,
          Loading: false
        };
      } else {
        return {
          ...state,
          Loading: false
        };
      }
    case FetchAllInventoryLogs:
      if (action.payload.success === true) {
        return {
          ...state,
          InventoryLogs: action.payload.InventoryLogs,
          Success: true,
          Loading: false
        };
      } else {
        return {
          ...state,
          Loading: false
        };
      }
    case FetchInventory:
      if (action.payload.success === true) {
        return {
          ...state,
          Inventory: action.payload.Inventory,
          Success: true,
          Loading: false
        };
      } else {
        return {
          ...state,
          Loading: false
        };
      }
    case BackInventories:
      if (action.payload.success === true) {
        let filteredInventories = state.Inventories.filter(inventory => inventory._id !== action.payload.Inventory._id);
        return {
          ...state,
          Inventory: action.payload.Inventory,
          Inventories: [...filteredInventories, action.payload.Inventory],
          Success: true,
          message: action.payload.message,
          Loading: false
        };
      } else {
        return {
          ...state,
          Loading: false
        };
      }
    case AddInventories:
      if (action.payload.success === true) {
        return {
          ...state,
          Inventories: [...state.Inventories, action.payload.Inventory],
          message: action.payload.message,
          Success: true,
          Loading: false
        };
      } else {
        return {
          ...state,
          Loading: false
        };
      }
    case BorrowInventories:
      if (action.payload.success === true) {
        let newInventories = state.Inventories.filter(inventory => inventory._id !== action.payload.Inventory._id);
        return {
          ...state,
          Inventories: [...newInventories, action.payload.Inventory],
          Loading: false
        };
      } else {
        return {
          ...state,
          Loading: false
        };
      }
    default:
      return {
        ...state,
        Loading: false
      };
  }
};
