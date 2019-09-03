import {
  FetchItem,
  FetchItems,
  AddItem,
  DeleteItem,
  AddStock,
  EditItem,
  UpdateItem,
  UnMountAlert
} from "../Actions/Actions";

const initialState = {
  items: [],
  item: {},
  Success: false,
  message: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FetchItems:
      if (action.payload.success === true) {
        return {
          ...state,
          items: action.payload.Items,
          Success: true,
          message: action.payload.message
        };
      } else {
        return {
          ...state,
          Success: false,
          message: action.payload.message
        };
      }
    case FetchItem:
      if (action.payload.success === true) {
        return {
          ...state,
          item: action.payload.Item,
          Success: true,
          message: action.payload.message
        };
      } else {
        return {
          ...state,
          Success: false,
          message: action.payload.message
        };
      }
    case AddItem:
      if (action.payload.success === true) {
        console.log(action.payload.Item);
        return {
          ...state,
          items: [...state.items, action.payload.Item],
          Success: true,
          message: action.payload.message
        };
      } else {
        return {
          ...state,
          Success: false,
          message: action.payload.message
        };
      }

    case UpdateItem:
      if (action.payload.success === true) {
        let FilteredItems = state.items.filter(
          item => item._id !== action.payload.Item._id
        );

        return {
          ...state,
          items: [...FilteredItems, action.payload.Item],
          Success: true,
          message: action.payload.message
        };
      } else {
        return {
          ...state,
          Success: false,
          message: action.payload.message
        };
      }

    case DeleteItem:
      if (action.payload.success === true) {
        let items = state.items.filter(
          item => item.id !== action.payload.Item.id
        );
        return {
          ...state,
          items: items,
          Success: true,
          message: action.payload.message
        };
      } else {
        return {
          ...state,
          Success: false,
          message: action.payload.message
        };
      }
    case UnMountAlert:
      return {
        ...state,
        Success: false,
        message: ""
      };
    default:
      return {
        ...state
      };
  }
};
