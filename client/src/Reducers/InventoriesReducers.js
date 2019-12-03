import {
  FetchAllInventories,
  AddInventories,
  RemoveInventories,
  BorrowInventories,
  BackInventories
} from "../Actions/Actions";

const initialState = {
  Success: false,
  message: "",
  Inventories: [],
  Inventory: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
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
        console.log(action.payload.Inventory);
        return {
          ...state,
          Success: true,
          message: action.payload.message
        };
      }
    default:
      return {
        ...state
      };
  }
};
