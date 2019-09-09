import {
  FetchItem,
  FetchItems,
  AddItem,
  DeleteItem,
  DeleteCategory,
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
  message: "",
  Loaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FetchAll:
      if (action.categories.success === true && action.items.success === true) {
        return {
          ...state,
          items: action.items.Items,
          categories: action.categories.Categories,
          Success: true,
          Loaded: true
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
      console.log(action.payload);
      if (action.payload.success === true) {
        return {
          ...state,
          categories: [...state.categories, action.payload.Category],
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
      console.log(state.items);
      console.log(action.payload.Item.Category);
      if (action.payload.success === true) {
        let FilteredItems = state.items.filter(
          item => item._id !== action.payload.Item._id
        );
        let Category = state.categories.filter(
          category => category._id === action.payload.Item.Category
        );
        action.payload.Item.Category = Category[0];
        console.log(FilteredItems);
        console.log(action.payload.Item.Category);
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
        console.log(state.items);
        let items = state.items.filter(
          item => item._id !== action.payload.Item._id
        );
        console.log(items);
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
    case DeleteCategory:
      if (action.payload.success === true) {
        let categories = state.categories.filter(
          category => category._id !== action.payload.Category._id
        );
        return {
          ...state,
          categories: categories,
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
