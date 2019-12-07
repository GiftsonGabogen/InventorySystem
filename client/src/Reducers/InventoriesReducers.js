import {
  FetchAll,
  FetchAllInventories,
  AddInventories,
  RemoveInventories,
  BorrowInventories,
  BackInventories,
  UnMountAlert
} from "../Actions/Actions";

const initialState = {
  Success: false,
  message: "",
  Inventories: [],
  Inventory: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UnMountAlert:
      return {
        ...state,
        message: "",
        Success: false
      };
    case FetchAll:
      if (action.inventories.success === true) {
        if (action.inventories.Inventories.length !== 0) {
          return {
            ...state,
            Inventories: action.inventories.Inventories,
            Success: true
          };
        } else {
          return {
            ...state
          };
        }
      } else {
        return {
          ...state
        };
      }
    case FetchAllInventories:
      if (action.payload.success === true) {
        if (action.payload.Inventories.length !== 0) {
          return {
            ...state,
            Inventories: action.payload.Inventories,
            Success: true
          };
        }
      } else {
        return {
          ...state
        };
      }
    case AddInventories:
      if (action.payload.success === true) {
        return {
          ...state,
          Inventories: [...state.Inventories, action.payload.Inventory],
          message: action.payload.message,
          Success: true
        };
      } else {
        return {
          ...state
        };
      }
    case BorrowInventories:
      if (action.payload.success === true) {
        let newInventories = state.Inventories.filter(inventory => inventory._id !== action.payload.Inventory._id);
        return {
          ...state,
          Inventories: [...newInventories, action.payload.Inventory]
        };
      } else {
        return {
          ...state
        };
      }
    default:
      return {
        ...state
      };
  }
};
