import {
  FetchItem,
  FetchItems,
  AddItem,
  DeleteItem,
  AddStock,
  EditItem,
  UpdateItem,
  UnMountAlert,
  AddCategory,
  FetchCategories,
  FetchAll
} from "../Actions/Actions";

const initialState = {
  items: [],
  item: {},
  categories: [],
  Success: false,
  message: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FetchAll:
      console.log(action.items.Items);
      console.log(action.categories.Categories);
      if (action.categories.success === true && action.items.success === true) {
        return {
          ...state,
          items: action.items.Items,
          categories: action.categories.Categories,
          Success: true,
          message: action.items.message + " " + action.categories.message
        };
      } else {
        return {
          ...state,
          Success: false,
          message: action.items.message + " " + action.categories.message
        };
      }
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
    case FetchCategories:
      if (action.payload.success === true) {
        return {
          ...state,
          categories: action.payload.Categories,
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
    case AddCategory:
      if (action.payload.success === true) {
        return {
          ...state,
          category: [...state.categories, action.payload.Category],
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
